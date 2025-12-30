import mongoose from "mongoose";

import {DEPARTMENTS} from "../constants/taxonomy.js";



const userSchema=new mongoose.Schema({
      userName:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true,select:false},
      department:{type:String,enum: DEPARTMENTS,
        required:true
      },
      role:{type:String,enum:["student","alumni","admin"],
        default: "student",
      },
   education:{
   type:[
    {
        degree:{type:String},
        college:{type:String},
    },
   ],
   default:[],
   },
   profileImg:{
    type:String,default:"",
   },
   description:{
    type:String,default:"",
   },
   openToWork:{
    type:Boolean,default:false,
   },
   interestArea:{
    type:[String],
    default:[],
   },
    address: {
      pincode: { type: String, default: "" },
      district: { type: String, default: "" },
      state: { type: String, default: "" },
    },
        counts: {
  connections: { type: Number, default: 0 }
},
},
{timestamps:true}
);

// Virtual relation to AlumniProfile (optional)
userSchema.virtual("alumniProfile", {
  ref: "AlumniProfile",
  localField: "_id",
  foreignField: "user",
  justOne: true, // 1:1
});



export default mongoose.model("User",userSchema);