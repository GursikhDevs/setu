import { io } from "socket.io-client";

const SERVER = "http://localhost:3000";   // your backend
const ROOM_ID = "6952a7d6451abdf8e264a346";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY5MTA5YWY5MzkwZDkxNDk1Yzk2Yjg0MiIsInJvbGUiOiJzdHVkZW50IiwibmFtZSI6Ik1hbmRlZXAgVGl3YXJpIiwiaWF0IjoxNzY3MDIzNDc2LCJleHAiOjE3NjcxMDk4NzZ9.26s-JVedol4S0wdN_Pcl2u13zKkgro-I6k6awhXduAU";

const socket = io(SERVER, {
  withCredentials: true,
  extraHeaders: {
    Cookie: `access_token=${TOKEN}`
  }
});

socket.on("connect", () => {
  console.log("connected");

  socket.emit("joinRoom", ROOM_ID);
  console.log("joined room:", ROOM_ID);

  // send message after join
  setTimeout(() => {
    socket.emit("sendMessage", {
      roomId: ROOM_ID,
      text: "Hello from mandeep!"
    });
  }, 8000);
});

socket.on("auth:ok", data => console.log("auth ok", data));

socket.on("message:new", msg => {
  console.log("NEW MESSAGE RECEIVED:", msg);
});

socket.on("disconnect", () => console.log("disconnected"));

socket.on("connect_error", err => console.log("ERROR", err.message));
