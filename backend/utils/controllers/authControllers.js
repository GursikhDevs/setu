import User from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {registerSchema} from "../validators/userValidations.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
const jwtSecret=process.env.JWT_SECRET;
export const signup = async (req, res) => {
  try {
    // console.log("hitted");
    // console.log(req.body);
    
    
    const result=registerSchema.safeParse(req.body);
    if (!result.success) {
  const firstError = result.error.issues?.[0]?.message;
  return res.status(401).json({ flash: "invalid inputs", err: firstError });
}
    if(!result){
      const firstError=result.error.issues?.[0].message;
    return req.status(401).json({flash:"invalid inputs",err:firstError});
    }
    // console.log(result);

     const { userName, email, department, role, password }=result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      userName,
      email,
      department,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
// console.log(user);

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    //jwt payload
    const payload = {
      ID: String(user._id),
      role: user.role,
      name: user.userName,
    };
    
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "1d",
    });
    console.log(token);
    

    res.cookie("access_token", token, {
      httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "lax",
  secure: false,
    });

    res.json({
      message: "Login successful",
      user: {
        name: user.userName,
        email: user.email,
        department: user.department,
        role: user.role,
        _id:user._id,
      },
      jwt :{
        token : token
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    console.log(userId)

    if (!req.file) return res.status(400).json({ error: "Image is required" });
   console.log(req.file)
    // Find user in DB
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Delete old image from Cloudinary if exists
    if (user.profileImg) {
      const parts = user.profileImg.split("/");
      const publicIdWithExt = parts[parts.length - 1];
      const publicId = `avatars/${publicIdWithExt.split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    // Remove local file
    fs.unlinkSync(req.file.path);

    // Update user's profile image URL in DB
    user.profileImg = result.secure_url;
    await user.save();
    console.log(user.profileImg);

    res.status(200).json({ message: "Profile picture updated", user });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};