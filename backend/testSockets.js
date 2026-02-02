import { io } from "socket.io-client";

const SERVER = "http://localhost:3000";   // your backend
const ROOM_ID = "6968b8e953991b2b2caafd8b";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY5NTYzZmY4ODA4MTQ3NmQ3Yjk0Zjk0MyIsInJvbGUiOiJhbHVtbmkiLCJuYW1lIjoiQWNoYXJ5YSBQcmFzaGFudCIsImlhdCI6MTc2ODY3Mjg3NCwiZXhwIjoxNzY4NzU5Mjc0fQ.eJ3YEDz4DIlKlOWQSdL5fJc_VXVea1bPMRaXqxDErPM";

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
      text: "Hello from acharya praahsant!"
    });
  }, 8000);
});

socket.on("auth:ok", data => console.log("auth ok", data));

socket.on("message:new", msg => {
  console.log("NEW MESSAGE RECEIVED:", msg);
});

socket.on("disconnect", () => console.log("disconnected"));

socket.on("connect_error", err => console.log("ERROR", err.message));
