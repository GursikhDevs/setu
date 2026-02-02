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
// console.log("hitting the api2");
    // ensure target exists
    const targetExists = await User.exists({ _id: targetId });
    if (!targetExists) {
      return res.status(404).json({ message: "User not found" });
    }
//  console.log("hitting the api2");
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





export const otherUsersChattedWith=async(req,res)=>{
  try{
const userId = req.user?.userId?.toString();

// 1.first we find all the rooms user ever participate
const rooms = await Room.find({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .sort({ updatedAt: -1 })
      .lean();

 if (!rooms.length) {
      return res.json({ rooms: [] });
    }

     // 2 collect other user ids
    const otherUserIds = rooms.map((room) =>
      room.userA.toString() === userId
        ? room.userB
        : room.userA
    );

    // 3️⃣ fetch user details in one query
    const users = await User.find(
      { _id: { $in: otherUserIds } },
      { userName: 1, profileImg: 1 }
    ).lean();

     // 4️⃣ map userId → user data
    const userMap = new Map(
      users.map((u) => [u._id.toString(), u])
    );

      // 5️⃣ final response
    const result = rooms.map((room) => {
      const otherUserId =
        room.userA.toString() === userId
          ? room.userB.toString()
          : room.userA.toString();

      return {
        roomId: room._id,
        user: userMap.get(otherUserId),
        updatedAt: room.updatedAt,
      };
    });
    return res.json({ rooms: result });

  }catch(err){
    console.error("startChat error:", err);
    return res.status(500).json({ message: err.message });
  }
}