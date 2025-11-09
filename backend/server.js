                //   OM namah sivay
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

//routes imports
import authRoutes from "./routes/authRoutes.js";

dotenv.config();


const app=express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

//routes
app.use("/auth",authRoutes);



const server=http.createServer(app);

connectDB();  //db connection 


//starting server 
const PORT = process.env.PORT||4000;
server.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
});


app.get("/",(req,res)=>{
    res.send('Swagat H');
});


