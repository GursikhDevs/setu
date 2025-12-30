import mongoose, { mongo } from "mongoose";
import { z } from "zod";
import Connection from "../models/connection.js";
import User from "../models/user.js";


const schema = z.object({
  targetId: z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid target id" }
  ),
});

//orderd pair making and returnig it func.
const orderedPair = (a, b) => (a.toString() < b.toString() ? [a, b] : [b, a]);

export async function sendConnectionRequest(req,res){
try{
const me = req.user.userId;
// console.log(req.params);
const { targetId } = schema.parse(req.params);// with zod validation

//ensuring not to connect self
if (me === targetId) {
      return res.status(400).json({ message: "Cannot connect to self" });
    }

    //ensure target exist 
     const targetExists = await User.exists({ _id: targetId });
    if (!targetExists) {
      return res.status(404).json({ message: "Target user not found" });
    }

//now taking the orderd pair
const [userA, userB] = orderedPair(me,targetId);

//check if an doc already exists between the pair
let edge = await Connection.findOne({ userA, userB});

if(!edge){
    //creating new request and saving the doc
    edge = new Connection({
        userA,
        userB,
        requester: me,
        status: "pending",
    });

    //now saving the doc with checking pre("validate") run
    await edge.save();
    return res.status(201).json({message:"Request sent",edge});
}

//now if the edge/doc exist then
 if (edge.status === "accepted") {
      return res.status(409).json({
        code: "ALREADY_CONNECTED",
        message: "You are already connected.",
        edge,
      });
    }

    if (edge.status === "blocked") {
      return res.status(403).json({
        code: "BLOCKED",
        message: "Connection is blocked.",
      });
    }

    if( edge.status ==="pending"){
        if(edge.requester.equals(me)){
           return res.status(200).json({
          message: "Request already pending.",
          edge,
        }); 
        }
        else{
           return res.status(409).json({
          code: "INCOMING_REQUEST_EXISTS",
          message: "The other user has already sent you a request.",
          edge,
        }); 
        }
    }

     if (edge.status === "declined") {
      // Policy: allow re-request (turn declined -> pending, requester = me)
      edge.status = "pending";
      edge.requester = me;
      await edge.save();
      return res.status(200).json({ message: "Request re-sent.", edge });
    }
    
    return res.status(500).json({ message: "Unknown edge state." });
    
}
catch(err){
    console.log("something went wrong in connectionreq controller",err);
    
    return res.status(500).json({ message: err.message });
}
}