import User from "../models/user.js";
import AlumniProfile from "../models/alumni.js";
import { upsertAlumniProfileSchema } from "../validators/alumniValidations.js";


export const upsertMyAlumniProfile = async (req, res) => {
  try {
    // console.log("yha tk aa gya");
    
    // Only alumni can upsert alumni profile
    console.log(req.user);
    
    if (req.user?.role !== "alumni") {
      return res.status(403).json({ message: "Only alumni can update alumni profile" });
    }

    const parsed = upsertAlumniProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      const first = parsed.error.issues?.[0];
      return res.status(400).json({ message: first?.message || "Invalid payload" });
    }

    const payload = parsed.data;

    // Upsert 1:1 profile for this user
    const profile = await AlumniProfile.findOneAndUpdate(
      { user: req.user.userId },
      { $set: payload, $setOnInsert: { user: req.user.userId } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: "Alumni profile saved", profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
//----------------------------------------------
/**
 * GET /alumni/profile/me
 * Fetch logged-in user's alumni profile (if exists).
 */
export const getMyAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({ user: req.user._id });
    return res.json({ profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * GET /alumni/search?jobTitle=&jobArea=&industry=&skills=a,b,c
 * Students can search alumni within their own department (by default).
 * If you want cross-department search, adjust the match.
 */
export const searchAlumniByDepartment = async (req, res) => {
  try {
    // Ensure the current user's department is used as the base filter
    const department = req.user?.department;
    if (!department) {
      return res.status(400).json({ message: "User department not found" });
    }

    const { jobTitle, jobArea, industry, skills } = req.query;

    const results = await User.aggregate([
      { $match: { role: "alumni", department } },
      {
        $lookup: {
          from: "alumniprofiles",
          localField: "_id",
          foreignField: "user",
          as: "alumniProfile",
        },
      },
      { $unwind: { path: "$alumniProfile", preserveNullAndEmptyArrays: false } },

      // Optional filters on alumniProfile
      {
        $match: {
          ...(jobTitle ? { "alumniProfile.jobTitle": { $regex: jobTitle, $options: "i" } } : {}),
          ...(jobArea ? { "alumniProfile.jobArea": jobArea } : {}),
          ...(industry ? { "alumniProfile.industry": { $regex: industry, $options: "i" } } : {}),
          ...(skills
            ? { "alumniProfile.skills": { $in: String(skills).split(",").map((s) => s.trim()) } }
            : {}),
        },
      },

      // Keep payload tidy
      {
        $project: {
          password: 0,
        },
      },
      { $limit: 50 },
    ]);

    return res.json({ results });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};