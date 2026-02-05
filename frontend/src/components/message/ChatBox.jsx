// //OM namah sivay
// import React, { useState, useEffect, useRef } from 'react';
// import { useMessageStore } from '../../store/messageStore';
// import { useSocket } from '../../hooks/useSocket';
// import MessageBubble from './MessageBubble'

// const ChatBox = ({previousMessage,actualRoomId}) => {
//   console.log(previousMessage);
  
//   const [messageText, setMessageText] = useState('');
//   const { selectedUser, currentRoom, messages, addMessage, startChat } = useMessageStore();
//   const { socket, isConnected } = useSocket();
//   const messagesEndRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // useEffect(() => {
//   //   if (selectedUser && socket) {
//   //     setLoading(true);
//   //     startChat(selectedUser._id)
//   //       .then((roomId) => {
//   //         socket.emit('joinRoom', roomId);
//   //         setLoading(false);
//   //       })
//   //       .catch(() => setLoading(false));
//   //   }
//   // }, [selectedUser, socket]);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('message:new', (message) => {
//       addMessage(message);
//     });

//     return () => {
//       socket.off('message:new');
//     };
//   }, [socket, addMessage]);

//   const handleSend = () => {
//     if (!messageText.trim() || !actualRoomId || !socket) return;

//     socket.emit('sendMessage', {
//       roomId: actualRoomId,
//       text: messageText.trim(),
//     });

//     setMessageText('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-black">
//         <div className="text-center">
//           <div className="text-6xl mb-4">💬</div>
//           <h3 className="text-xl font-semibold text-white mb-2">
//             Select a conversation
//           </h3>
//           <p className="text-gray-400">
//             Choose someone from the list to start chatting
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-black">
//       {/* Chat Header */}
//       <div className="bg-black border-b border-gray-800 px-6 py-4 flex items-center gap-4">
//         <img
//           src={selectedUser.profileImg || 'https://ui-avatars.com/api/?name=' + selectedUser.userName + '&background=4F46E5&color=fff'}
//           alt={selectedUser.userName}
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <h3 className="font-semibold text-lg text-white">{selectedUser.userName}</h3>
//           <p className="text-sm text-gray-400 flex items-center gap-2">
//             {isConnected && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
//             {isConnected ? 'online' : 'offline'}
//           </p>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-6 bg-black">
//         {loading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className="text-center text-gray-400 mt-20">
//             <p>No messages yet. Start the conversation! 👋</p>
//           </div>
//         ) : (
//           <>
//             {/* Date Header */}
//             <div className="text-center mb-6">
//               <span className="text-gray-500 text-sm">
//                 {new Date().toLocaleDateString('en-GB', {
//                   day: '2-digit',
//                   month: '2-digit',
//                   year: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </span>
//             </div>
//             {messages.map((msg) => (
//               <MessageBubble key={msg._id} message={msg} />
//             ))}
//           </>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="bg-black border-t border-gray-800 px-6 py-4">
//         <div className="flex items-center gap-3">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             disabled={!isConnected}
//           />
//           <button
//             onClick={handleSend}
//             disabled={!messageText.trim() || !isConnected}
//             className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

// OM namah sivay
import React, { useEffect, useRef, useState } from 'react';
// import { useSocket } from '../../hooks/useSocket';
import MessageBubble from './MessageBubble';

const ChatBox = ({ previousMessage = [], actualRoomId,socket, isConnected }) => {
  // const { socket, isConnected } = useSocket();
// console.log("ChatBox socket id:", socket?.id);


  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // ✅ Load previous messages when they ARRIVE
  useEffect(() => {
    if (!actualRoomId) return;

    // if (
    //   Array.isArray(previousMessage) &&
    //   previousMessage.length > 0 &&
    //   messages.length === 0
    // )
      if (Array.isArray(previousMessage)){
      setMessages(previousMessage);
    }
  }, [actualRoomId, previousMessage]);

  // ✅ Listen for socket messages
  useEffect(() => {
    if (!socket || !actualRoomId) return;

    const handleNewMessage = (message) => {
//       console.log("SOCKET MESSAGE:", message);
// console.log("ROOM FROM SOCKET:", message.room);
// console.log("ACTUAL ROOM:", actualRoomId);

      if (String(message.room) === String(actualRoomId)) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('message:new', handleNewMessage);
    return () => socket.off('message:new', handleNewMessage);
  }, [socket, actualRoomId]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✅ Send message
  const handleSend = () => {
    if (!messageText.trim() || !socket || !actualRoomId) return;

    socket.emit('sendMessage', {
      roomId: actualRoomId,
      text: messageText.trim(),
    });

    setMessageText('');
  };

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">
            No messages yet. Start the conversation 👋
          </p>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-800 px-6 py-4">
        <div className="flex gap-3">
          <input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-full"
            disabled={!isConnected}
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !messageText.trim()}
            className="bg-blue-600 px-6 py-3 rounded-full text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

