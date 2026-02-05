import Post from "../models/post.js";
import {cloudinary} from "../config/cloudinary.js";
import Connection from "../models/connection.js";
import fs from "fs";
import mongoose from "mongoose";



const allowedVisibility = ["public", "connections"];

export const createPost= async(req,res)=>{
    try{
const author = req.user.userId;
const {text,visibility}=req.body;
console.log("text",text,"visibility",visibility);


if (visibility && !allowedVisibility.includes(visibility)) {
  return res.status(400).json({
    message: "visibility must be public or connections",
  });
}

let media = null;

//1'st validation atlest text or file
if(!text && !req.file){
    return res.status(400).json({message:"Post must contain text or media"});
}
console.log(req.file);

if(req.file){
    const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
           folder: `posts/${author}`
        }
    );
    
    media={
         type: uploadResult.resource_type,
        url: uploadResult.secure_url,
    }

      // remove local file after upload
      fs.unlinkSync(req.file.path);
}


const post=await Post.create({
    author,
    text,
    media,
    visibility:visibility || "public",
});

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });



    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error!"})
        
    }
}




export const getFeed = async(req,res)=>{
    try{
      // console.log("get feed hitted");
        const viewerId = req.user.userId;
        //pagination logic 
            const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "10", 10), 50);
    const skip = (page - 1) * limit;
//fetching accepted connectionsof viewer
    const connections = await Connection.find(
      {
        status: "accepted",
        $or: [{ userA: viewerId }, { userB: viewerId }],
      },
      { userA: 1, userB: 1 }
    ).lean();
//extracting other users id's from connections list
    const connectedUserIds = connections.map((c) =>
      c.userA.toString() === viewerId
        ? c.userB
        : c.userA
    );
//building feed fiter 
    const feedFilter = {
      $or: [
        // 1️⃣ Public posts
        { visibility: "public" },

        // 2️⃣ My own posts
        { author: viewerId },

        // 3️⃣ Connections-only posts from my connections
        {
          visibility: "connections",
          author: { $in: connectedUserIds },
        },
      ],
    };
//fetching post using our filter
    const posts = await Post.find(feedFilter)
      .populate("author", "userName profileImg")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
//Total count (for frontend pagination)
    const total = await Post.countDocuments(feedFilter);
//response
    return res.json({
      page,
      limit,
      total,
      hasNextPage: skip + posts.length < total,
      posts,
    });

    }catch(err){
         console.log(err);
        return res.status(500).json({message:"Server Error!"})
    }
}





export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const me = String(req.user.userId);
    const role = req.user.role;


    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });


    const isAuthor = post.author.toString() === me;
    const isAdmin = role === "admin";
   if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }


    // --- CLOUDINARY DELETION LOGIC ---
    if (post.media && post.media.url) {
      try {
        // Example URL: https://res.cloudinary.com/demo/image/upload/v1234/posts/authorId/imageName.jpg
        // We need: "posts/authorId/imageName"
        const urlParts = post.media.url.split("/");
        const fileNameWithExtension = urlParts[urlParts.length - 1]; // "imageName.jpg"
        const publicIdWithoutExt = fileNameWithExtension.split(".")[0]; // "imageName"
       
        // Since you saved it in folder: `posts/${author}`, the public_id includes the folder path
        const publicId = `posts/${post.author}/${publicIdWithoutExt}`;


        console.log("Deleting from Cloudinary:", publicId);
 await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryErr) {
        console.error("Cloudinary Delete Failed:", cloudinaryErr.message);
        // We don't stop here; we still want to delete the post from DB
      }
    }


    await post.deleteOne();
   
    res.status(200).json({
      message: "Post and Media deleted successfully",
      deletedPostId: postId
    });


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
