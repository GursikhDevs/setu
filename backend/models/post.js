import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    //who created the post
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    //optional text content
    text:{
        type: String,
        trim: true,
        maxLength: 5000,//safety limit
    },
    //optional media
    media:{
        type:{
            type: String,
            enum: ["image","video","audio"],
        },
        url:{
            type: String,
        },
    },
    
    visibility:{
        type: String,
        enum: ["public","connections"],
        default: "public",
        index: true,
    },
    //counters
    likesCount:{
        type: Number,
        default: 0,
    },
    commentsCount:{
        type: Number,
        default: 0,
    },
},
{timestamps: true}
);

//feed optimization
postSchema.index({createdAt: -1});
postSchema.index({author: 1, createdAt: -1});

export default mongoose.model("Post",postSchema);