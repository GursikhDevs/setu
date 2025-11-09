import User from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {registerSchema} from "../validators/userValidations.js";

export const signup = async (req, res) => {
  try {
    // console.log("hitted");
    // console.log(req.body);
    
    
    const result=registerSchema.safeParse(req.body);
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

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    //jwt payload
    const payload = {
      ID: String(user._id),
      role: user.role,
      name: user.userName,
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    });

    res.json({
      message: "Login successful",
      user: {
        name: user.userName,
        email: user.email,
        department: user.department,
        role: user.role,
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