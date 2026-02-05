import jwt from "jsonwebtoken";
import User from "../models/user.js";


const jwtSecret = process.env.JWT_SECRET;

export async function getUserFromToken(token){
    if(!token) throw new Error("Authorization token missing.");
    let decoded;
    try{
        decoded= jwt.verify(token,jwtSecret);
    }catch(err){
        throw new Error("Invalid or expired token");
    }

const id = decoded.ID || decoded._id;
if (!id) throw new Error("Invalid token payload.");

const user = await User.findById(id).select("_id userName email role department");
if(!user) throw new Error("User not found");

return user;
}