// OM namah sivay
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
const activeRoomId = searchParams.get("roomId");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3000/chat/everChated",
          { withCredentials: true }
        );

        // transform API response → sidebar friendly shape
        const sidebarUsers = res.data.rooms.map((room) => ({
          roomId: room.roomId,
          userId: room.user._id,
          userName: room.user.userName,
          profileImg: room.user.profileImg,
          updatedAt: room.updatedAt,
        }));

        setUsers(sidebarUsers);
      } catch (error) {
        console.error("Fetch chats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleOnOtherUserClick = (userId, roomId) => {
    // console.log(`otherUserIdis: ${userId} and roomID is: ${roomId}`);
    
    setSelectedRoomId(roomId);

    const params = {
      secondPersonId: userId,
      roomId,
    };

    const queryString = new URLSearchParams(params).toString();
    navigate(`/feed/messages?${queryString}`);
  };

  const filteredUsers = users.filter((u) =>
    u.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full lg:w-80 bg-black flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        <p className="text-sm text-gray-400 mt-1">
          Your recent conversations
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 p-8">
            No conversations yet
          </div>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u.roomId}
              onClick={() =>
                handleOnOtherUserClick(u.userId, u.roomId)
              }
              className={`px-6 py-4 cursor-pointer transition-colors border-b border-gray-800 hover:bg-gray-900 ${
                selectedRoomId === u.roomId || activeRoomId === u.roomId ? "bg-blue-900/30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    u.profileImg ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      u.userName
                    )}&background=4F46E5&color=fff`
                  }
                  alt={u.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">
                    {u.userName}
                  </h4>
                  <p className="text-sm text-gray-400 truncate">
                    Click to open chat
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;


// export default ChatSidebar;// OM namah sivay
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useMessageStore } from "../../store/messageStore";
// import { useAuthStore } from "../../store/authStore";
// import { useNavigate } from "react-router-dom";

// const ChatSidebar = () => {
//   const navigate=useNavigate();
//   const { users, setUsers, selectedUser } = useMessageStore();
//   const { user: currentUser } = useAuthStore();
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchChats = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/chat/everChated",
//           { withCredentials: true }
//         );

//         // 🔥 IMPORTANT TRANSFORMATION
//         const sidebarUsers = res.data.rooms.map((room) => ({
//           roomId: room.roomId,
//           _id: room.user._id,
//           userName: room.user.userName,
//           profileImg: room.user.profileImg,
//           updatedAt: room.updatedAt,
//         }));

//         setUsers(sidebarUsers);
//       } catch (error) {
//         console.error("Fetch chats error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChats();
//   }, [setUsers]);


// const handleOnOtherUserClick=async(otherUserId,PassroomId)=>{
// try{
// //    const API=`http://localhost:3000/chat/start/${otherUserId}`
// // const res=await axios.post(API,null,{
// //     withCredentials: true // Include this in the config object
// //   });
//   // console.log(res);
//   const params={
//     secondPersonId:otherUserId,
//     roomId:PassroomId
//   }
//   const queryString = new URLSearchParams(params).toString();
//   navigate(`/messages?${queryString}`);
// }catch(err){
//   console.log(err);
  
// }
// }



//   const filteredUsers = users.filter((u) =>
//     u.userName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="w-full lg:w-80 bg-black flex flex-col border-r border-gray-800">
//       {/* Header */}
//       <div className="px-6 py-6 border-b border-gray-800">
//         <h2 className="text-2xl font-bold text-white">Messages</h2>
//         <p className="text-sm text-gray-400 mt-1">
//           Your recent conversations
//         </p>
//       </div>

//       {/* Search */}
//       <div className="px-4 py-3">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search conversations"
//             className="w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
//           />
//           <svg
//             className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//           </div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="text-center text-gray-400 p-8">
//             No conversations yet
//           </div>
//         ) : (
//           filteredUsers.map((u) => (
//             <div
//               key={u.roomId}
//               onClick={() => handleOnOtherUserClick(u._id,u.roomId)}
//               className={`px-6 py-4 cursor-pointer transition-colors border-b border-gray-800 hover:bg-gray-900 ${
//                 selectedUser?.roomId === u.roomId
//                   ? "bg-blue-900/30"
//                   : ""
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={
//                     u.profileImg ||
//                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       u.userName
//                     )}&background=4F46E5&color=fff`
//                   }
//                   alt={u.userName}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />

//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-semibold text-white truncate">
//                     {u.userName}
//                   </h4>
//                   <p className="text-sm text-gray-400 truncate">
//                     Click to open chat
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSidebar;
