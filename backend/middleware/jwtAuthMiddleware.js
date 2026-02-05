import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {getUserFromToken} from "../utils/authHelpers.js";
const jwtSecret=process.env.JWT_SECRET;


export const authenticateUser=async(req,res,next)=>{
    try{
 // console.log(jwtSecret);
    // console.log("auth middle ware m aa gya1");
    const auth = req.headers.authorization || "";
    const fromHeader = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    const fromCookie = req.cookies?.access_token || req.cookies?.token || req.cookies?.jwt;

    const token = fromHeader || fromCookie;
    if (!token) return res.status(401).json({ message: "Authorization token missing." });
const user = await getUserFromToken(token);//may throw

req.user = {
      userId: user._id,
      full_name: user.userName,
      email: user.email,
      role: user.role?user.role:"",
      department:user.department,
    };
    next();
    
    }catch(err){
         return res.status(401).json({ message: err.message });
    }
}