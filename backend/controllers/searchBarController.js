import User from "../models/user.js";
import AlumniProfile from "../models/alumni.js";
import mongoose from "mongoose";

export const searchUsers = async (req, res) => {
  try {
    console.log("search api hit");

    const { query } = req.body;
    console.log("query:", query);

    // 1️⃣ empty query
    if (!query || !query.trim()) {
      return res.json({ count: 0, results: [] });
    }

    const regex = new RegExp(query.trim(), "i");

    // 2️⃣ search users (students + alumni)
    const users = await User.find(
      {
        $or: [
          { userName: regex },
          { fullName: regex },
          { department: regex },
          { skills: regex },
          { batch: regex },
        ],
      },
      {
        userName: 1,
        fullName: 1,
        profileImg: 1,
        department: 1,
        role: 1,
      }
    )
      .limit(20)
      .lean();

    // 3️⃣ get alumni user ids
    const alumniUserIds = users
      .filter((u) => u.role === "alumni")
      .map((u) => u._id);

    let alumniMap = {};

    // 4️⃣ fetch alumni profiles safely
    if (alumniUserIds.length) {
      const alumniProfiles = await AlumniProfile.find(
        { user: { $in: alumniUserIds } },
        {
          company: 1,
          jobTitle: 1,
          jobArea: 1,
          yearsOfExperience: 1,
          user: 1, // 🔥 IMPORTANT FIX
        }
      ).lean();

      alumniMap = {};

      for (const a of alumniProfiles) {
        if (a.user) {
          alumniMap[a.user.toString()] = a;
        }
      }
    }

    // 5️⃣ final response shaping
    const results = users.map((u) => ({
      _id: u._id,
      userName: u.userName,
      fullName: u.fullName,
      profileImg: u.profileImg,
      department: u.department,
      role: u.role,
      alumniInfo: alumniMap[u._id.toString()] || null,
    }));

    return res.json({
      count: results.length,
      results,
    });
  } catch (err) {
    console.error("searchUsers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
