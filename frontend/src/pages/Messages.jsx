//OM namah sivay
import React from 'react';
import Navbar from '../components/layout/Navbar';  // ✅ CORRECT PATH!
import ChatSidebar from '../components/ChatSidebar';
import ChatBox from '../components/ChatBox';

const Messages = () => {
  return (
    <div className="h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Messages;
