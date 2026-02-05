import { io } from "socket.io-client";

const SERVER = "http://localhost:3000";   // your backend
const ROOM_ID = "6952a7d6451abdf8e264a346";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY5NTJhNDVkOTgwYmY3YmQzYzNmZDlhMiIsInJvbGUiOiJzdHVkZW50IiwibmFtZSI6IlZpc2h1IEJoYWkiLCJpYXQiOjE3NjcwMjM3NDIsImV4cCI6MTc2NzExMDE0Mn0.eRSWsYc3hNqAmiMDQ-f2REc0szbvNS7EmL9utEGvbvc";

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
      text: "Hello from vishu!"
    });
  }, 1000);
});

socket.on("auth:ok", data => console.log("auth ok", data));

socket.on("message:new", msg => {
  console.log("NEW MESSAGE RECEIVED:", msg);
});

socket.on("disconnect", () => console.log("disconnected"));

socket.on("connect_error", err => console.log("ERROR", err.message));
