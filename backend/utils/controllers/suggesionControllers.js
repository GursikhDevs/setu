import User from "../models/user.js";
import AlumniProfile from "../models/alumni.js";
import mongoose from "mongoose";

export const alumniSuggestionList=async(req,res)=>{
    try{
const UserId=req.user?.userId;
if(!UserId){
    return res.status(400).json({message:"Unauthorized"});
}
//Action Begins
// 1) Find student + their department
const member = await User.findById(UserId).select("department role");
if(!member){return res.status(400).json({message:"User not found"});}


const page = Math.max(parseInt(req.query.page?? "1",10),1);
const limit= Math.min(Math.max(parseInt(req.query.limit ?? "10",10),1),50);
const skip = (page -1) * limit;


 // 2) Build aggregation for matching alumni on student's department
 //2.1
 const matchDepartment = { jobArea:member.department };
 
 //aggregation pipeline
 const pipeline= [
    {$match: matchDepartment},

     // 2.2) join single user doc (1:1), but only fetch fields needed for the card
    {
        $lookup:{
            from: "users",
            let: { uid: "$user" },
            pipeline:[
                {$match: { $expr: { $eq: ["$_id","$$uid"]} } },
                { $project:{ _id: 1, userName:1, profileImg: 1} },
            ],
            as: "userDoc",
        },
    },
//2.3
    { $unwind: "$userDoc" }, //1:1, guaranteed

    //2.4 sort (mentors first, then experience, then newest)
    { $sort:{ availableForMentorship: -1, yearsOfExperience: -1, createdAt: -1}},

    //2.5 facet: compact projection for cards + total count
    {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                company: 1,
                jobTitle: 1,
                availableForMentorship: 1,
                user: {
                  _id: "$userDoc._id",
                  userName: "$userDoc.userName",
                  profileImg: "$userDoc.profileImg",
                },
              },
            },
          ],
          meta: [{ $count: "total" }],
        },
      },
 ];

// now lgao aggregation pipeline or lao data
const result = await AlumniProfile.aggregate(pipeline);
// console.log(result[0]);

 const suggestions = result?.[0]?.data ?? [];
    const total = result?.[0]?.meta?.[0]?.total ?? 0;


 return res.json({
      page,
      limit,
      total,
      hasNextPage: skip + suggestions.length < total,
      suggestions,
    });

    }
    catch(err){
       console.error("getAlumniSuggestions error:", err);
        res.status(500).json({message:"Server Error",err});
    }
}




//without login alumni suggestion list
export const publicAlumniSuggestionList = async (req, res) => {
  try {
    console.log("aya");
    
    const page = Math.max(parseInt(req.query.page ?? "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit ?? "10", 10), 1), 50);
    const skip = (page - 1) * limit;

    // Aggregation pipeline
    const pipeline = [
      // 1️⃣ Randomize alumni
      { $sample: { size: skip + limit } },

      // 2️⃣ Join user data (1:1)
      {
        $lookup: {
          from: "users",
          let: { uid: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$uid"] } } },
            { $project: { _id: 1, userName: 1, profileImg: 1 } },
          ],
          as: "userDoc",
        },
      },

      // 3️⃣ Unwind joined user
      { $unwind: "$userDoc" },

      // 4️⃣ Optional sorting (after randomness)
      {
        $sort: {
          availableForMentorship: -1,
          yearsOfExperience: -1,
          createdAt: -1,
        },
      },

      // 5️⃣ Facet for pagination + total
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                company: 1,
                jobTitle: 1,
                availableForMentorship: 1,
                user: {
                  _id: "$userDoc._id",
                  userName: "$userDoc.userName",
                  profileImg: "$userDoc.profileImg",
                },
              },
            },
          ],
          meta: [{ $count: "total" }],
        },
      },
    ];

    const result = await AlumniProfile.aggregate(pipeline);

    const suggestions = result?.[0]?.data ?? [];
    const total = result?.[0]?.meta?.[0]?.total ?? 0;

    return res.json({
      page,
      limit,
      total,
      hasNextPage: skip + suggestions.length < total,
      suggestions,
    });
  } catch (err) {
    console.error("publicAlumniSuggestionList error:", err);
    return res.status(500).json({ message: "Server Error", err });
  }
};




export const smartAlumniSuggestion=async(req,res)=>{
  try{
 const userId = req.user.userId;

    // 1️⃣ Fetch logged-in user
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDepartment = user.department;
    const userSkills = user.skills || [];
    const userLocation = user.location || {};

    // 2️⃣ Aggregation pipeline
    const pipeline = [
      // join alumni → user
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDoc",
        },
      },
      { $unwind: "$userDoc" },

      // 3️⃣ Compute SCORE
      {
        $addFields: {
          score: {
            $add: [
              // job area match
              {
                $cond: [
                  { $eq: ["$jobArea", userDepartment] },
                  30,
                  0,
                ],
              },

              // mentorship bonus
              {
                $cond: [
                  { $eq: ["$availableForMentorship", true] },
                  20,
                  0,
                ],
              },

              // experience points
              {
                $cond: [
                  { $gte: ["$yearsOfExperience", 10] },
                  20,
                  {
                    $cond: [
                      { $gte: ["$yearsOfExperience", 5] },
                      15,
                      5,
                    ],
                  },
                ],
              },

              // skill matching (cap at 25)
              {
                $min: [
                  {
                    $multiply: [
                      {
                        $size: {
                          $setIntersection: ["$skills", userSkills],
                        },
                      },
                      5,
                    ],
                  },
                  25,
                ],
              },

              // location match (country)
              {
                $cond: [
                  {
                    $eq: ["$location.country", userLocation.country],
                  },
                  5,
                  0,
                ],
              },
            ],
          },
        },
      },

      // 4️⃣ Sort by score
      { $sort: { score: -1, createdAt: -1 } },

      // 5️⃣ Limit to TOP 3
      { $limit: 3 },

      // 6️⃣ Shape final response
      {
        $project: {
          score: 1,
          company: 1,
          jobTitle: 1,
          jobArea: 1,
          yearsOfExperience: 1,
          availableForMentorship: 1,
          user: {
            _id: "$userDoc._id",
            userName: "$userDoc.userName",
            profileImg: "$userDoc.profileImg",
          },
        },
      },
    ];

    const alumni = await AlumniProfile.aggregate(pipeline);

    return res.json({
      count: alumni.length,
      suggestions: alumni,
    });
  }catch(err){
    console.error("publicAlumniSuggestionList error:", err);
    return res.status(500).json({ message: "Server Error", err });
  }
}