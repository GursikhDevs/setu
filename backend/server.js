                //   OM namah sivay
import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();


const app=express();
app.use(express.json());

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


