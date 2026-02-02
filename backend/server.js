                //   OM namah sivay
                import 'dotenv/config';
import express from "express";
import http from "http";
import { initSockets } from "./sockets/socketSetup.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

//routes imports
import authRoutes from "./routes/authRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js"
import messageRoutes from "./routes/messagesRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profilePageRoutes.js";

const app=express();
await connectDB();  //db connection 
const server=http.createServer(app);
const io = initSockets(server);

//make io availabe in controllers via req.io
app.use((req, _res, next) => { req.io = io; next();});
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

//routes
app.use("/auth",authRoutes);
app.use("/alumni",alumniRoutes);
app.use("/suggestion",suggestionRoutes);
app.use("/connection",connectionRoutes);
app.use("/chat",messageRoutes);
app.use("/posts",postRoutes);
app.use("/profile",profileRoutes);


//starting server 
const PORT = process.env.PORT||3000;
server.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
    //  console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length ?? "undefined");
});


app.get("/",(req,res)=>{
    res.send('Swagat H');
});


