                   //OM namah sivay
import {Server} from "socket.io";
import cookie from "cookie";
import {getUserFromToken} from "../utils/authHelpers.js";
import Room from "../models/room.js";
import Message from "../models/message.js";

const origin = process.env.CLIENT_URL || "http://localhost:5173";
export function initSockets(httpServer){
    const io = new Server(httpServer,{
        cors: { origin, methods: ["GET", "POST",], credentials: true,
        },
    });

//socket auth middleware (only logged in user)
io.use(async(socket, next)=>{
    try{
        console.log("ye to chala h re baba");
        
        
        
         const raw = socket.request.headers.cookie;
         console.log("ye bhi chl gya 2");
          if (!raw){console.log("cookies missing");
           return next(new Error("Cookies missing"));}
          console.log("ye bhi chl gya 3");
           const cookies = cookie.parse(raw);
           console.log("cookies",cookies);
           
            const token =
    cookies.access_token || cookies.token || cookies.jwt;
    console.log("ye bhi chl gya 4");
         // token can be sent via handshake auth or Authorization header
// const token = socket.handshake.auth?.token ||
// (socket.handshake.headers?.authorization || "").startsWith("Bearer ")? socket.handshake.headers.authorization.split(" ")[1]: null;

 if (!token) return next(new Error("Unauthorized: missing token"));

 const user = await getUserFromToken(token); // verifies & returns user
      // attach normalized user info to socket.data
      socket.data.user = {
        id: user._id.toString(),
        userName: user.userName,
        email: user.email,
        role: user.role || "",
        department: user.department,
      };

       return next();

    }catch(err){
         return next(new Error("Unauthorized: " + err.message));
    }
});



io.on("connection", (socket)=>{
    console.log("connected bro");
    
    const userId = socket.data.user.id;
    //join personal room
    socket.join(`user:${userId}`);
    //confirm to client
    socket.emit("auth:ok",{ userId,userName: socket.data.user.userName});


    //User joins chat room
    socket.on("joinRoom",async(roomId)=>{
        try{
            const room = await Room.findById(roomId);
            if(!room){
                return;
            }
            //ensure user belongs to room
            if(room.userA.toString()!==userId &&
        room.userB.toString()!==userId){
            return;
        }

        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);

        }catch(err){
        console.log("joinRoom error", err);
    }
    });

   //chatting messages
    socket.on("sendMessage",async({roomId,text})=>{
        try{
        if(!text?.trim())return;

        const room= await Room.findById(roomId);
        if(!room)return;

        //ensure valid user
        if(
            room.userA.toString() !== userId &&
            room.userB.toString() !== userId
        ){
            return;
        }

      //save message
      const msg = await Message.create({
        room: roomId,
        sender: userId,
        text
      });

      //update room activity
      room.updatedAt = new Date();
      await room.save();

      const messagePayload = {
        _id: msg._id,
        room: roomId,
        sender: userId,
        text,
        createdAt: msg.createdAt
      };

      //Broadcast to room (online users)
      io.to(roomId).emit("message:new",messagePayload);


// Notify receiver personally — useful if they are not in chat UI //we make it later we implement it when we are making the notification functionality
    //   const otherUser =
    //     room.userA.toString() === userId ? room.userB : room.userA;

    //   io.to(`user:${otherUser}`).emit("message:notify", messagePayload);



        }catch(err){
             console.log("sendMessage error", err);
        }
    });






     socket.on("disconnect", (reason) => {
      // optional cleanup
        console.log("socket disconnected", reason);
    });
});

return io;

}