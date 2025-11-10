import mongoose from "mongoose";
import {DEPARTMENTS} from "../constants/taxonomy.js";

const AlumniProfileSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true, //1:1
    },
    company:{type:String,default:""},
    jobTitle:{type:String,default:""},
    jobArea:{type:String,enum:DEPARTMENTS,default:"Other"},
    industry:{type:String,default:""},
    yearsOfExperience:{type:Number,default:0},
    skills:{type:[String],default:[]},
    socialMediaLinks:{
        linkedIn:{type:String,default:""},
        instagram:{type:String,default:""},
        other:{type:String,default:""},
    },
    currentAddress:{
        pincode: { type: String, default: "" },
      district: { type: String, default: "" },
      state: { type: String, default: "" },
    },
    availableForMentorship:{type:Boolean,default:false},
},
{timestamps:true}
);

// helpful filters
AlumniProfileSchema.index({ jobTitle: 1 });
AlumniProfileSchema.index({ industry: 1 });
AlumniProfileSchema.index({ skills: 1 });



export default mongoose.model("AlumniProfile", AlumniProfileSchema);