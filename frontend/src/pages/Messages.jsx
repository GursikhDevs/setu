//OM namah sivay
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';  // ✅ CORRECT PATH!
import ChatSidebar from '../components/message/ChatSidebar';
import ChatBox from '../components/message/ChatBox';
import { useSearchParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import axios from 'axios';

const Pre_API_URL = import.meta.env.VITE_API_URL;
const Messages = () => {
  const { socket, isConnected } = useSocket();
  const [messages,setMessages]=useState();
   const [searchParams] = useSearchParams();
   const secondPersonId = searchParams.get('secondPersonId');
  const roomId = searchParams.get('roomId');
  console.log(`secondid:${secondPersonId} and roomId:${roomId}`);



console.log("Messages socket id:", socket?.id);

  useEffect(()=>{
    if (!socket || !isConnected || !roomId || !secondPersonId) return;
    const getChats=async()=>{
    try{
const API=`${Pre_API_URL}/chat/start/${secondPersonId}`
const res=await axios.post(API,null,{
    withCredentials: true // Include this in the config object
  });
  console.log("message.jsx k message:",res.data.messages);
  setMessages(res.data.messages);
  console.log("roomId:",roomId);
  
  socket.emit("joinRoom", roomId);
  console.log("joinRoom emitted:",roomId);
  
    }catch(err){
      console.log(err);
    }
  }
   if (secondPersonId) {
    getChats();
  }
},[socket, isConnected, roomId, secondPersonId]);
  
  return (
    <div className="h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar />
        <ChatBox previousMessage={messages} actualRoomId={roomId}  socket={socket}
  isConnected={isConnected}/>
      </div>
    </div>
  );
};

export default Messages;
