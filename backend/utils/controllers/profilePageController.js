import User from "../models/user.js";
import AlumniProfile from "../models/alumni.js";
import Post from "../models/post.js";
import Connection from "../models/connection.js";


export const getProfilePage = async (req, res) => {
  try {
    // console.log("hitted");
    
    const { userId } = req.params;


    // 1️⃣ user basic info
    const user = await User.findById(userId)
      .select("-password")
      .lean();


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // 2️⃣ alumni profile (if alumni)
 let alumniProfile = null;
    if (user.role === "alumni") {
      alumniProfile = await AlumniProfile.findOne({ user: userId }).lean();
    }


    // 3️⃣ connections count
    const connectionsCount = await Connection.countDocuments({
      status: "accepted",
      $or: [{ userA: userId }, { userB: userId }]
    });
    //add text post


    // 4️⃣ posts (media only)
    const posts = await Post.find({
      author: userId,
      "media.url": { $exists: true }
    })
      .sort({ createdAt: -1 })
      .lean();
  return res.json({
      user,
      alumniProfile,
      connectionsCount,
      posts
    });


  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
