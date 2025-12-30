import Room from "../models/room.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import mongoose from "mongoose";
// import { orderedPair, isValidObjectId } from "../utils/pair.js";


//utility function
export function orderedPair(a, b) {
  const A = a.toString();
  const B = b.toString();
  return A < B ? [A, B] : [B, A];
}

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}


//api controller starts here
export async function startChat(req, res) {
  try {
    console.log("hitting the api");
    
    const me = req.user.userId;
    if(!me){
       return res.status(400).json({ message: "you are not authorized!" });
    }
    const targetId = req.params.targetId;
    console.log(`my id is${me} and target id is ${targetId}`);
    

    // basic validation
    if (!isValidObjectId(targetId)) {
      return res.status(400).json({ message: "Invalid target user id" });
    }

    if (me === targetId) {
      return res.status(400).json({ message: "Cannot chat with yourself" });
    }

    // ensure target exists
    const targetExists = await User.exists({ _id: targetId });
    if (!targetExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // normalize pair
    const [userA, userB] = orderedPair(me, targetId);

    // check if room exists
    let room = await Room.findOne({ userA, userB });

    // create if not
    if (!room) {
      room = await Room.create({ userA, userB });
    }

    // get previous messages (sorted oldest → newest)
    const messages = await Message.find({ room: room._id })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      roomId: room._id,
      participants: [userA, userB],
      messages,
    });
  } catch (err) {
    console.error("startChat error:", err);
    return res.status(500).json({ message: err.message });
  }
}





