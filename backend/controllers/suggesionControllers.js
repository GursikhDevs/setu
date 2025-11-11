import User from "../models/user.js";
import AlumniProfile from "../models/alumni.js";

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