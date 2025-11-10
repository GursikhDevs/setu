                //   OM namah sivay
                import 'dotenv/config';
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

//routes imports
import authRoutes from "./routes/authRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";



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
app.use("/alumni",alumniRoutes);



const server=http.createServer(app);

connectDB();  //db connection 


//starting server 
const PORT = process.env.PORT||4000;
server.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
    //  console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length ?? "undefined");
});


app.get("/",(req,res)=>{
    res.send('Swagat H');
});


