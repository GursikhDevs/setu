//OM namah sivay
//OM namah sivay
import React, { useEffect, useState } from 'react';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';

// ... rest of the code (keep same as before)

const ChatSidebar = () => {
  const { users, setUsers, selectedUser, selectUser } = useMessageStore();
  const { user: currentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/alumni`, {
          credentials: 'include',
        });
        const data = await res.json();
        
        const filteredUsers = data.filter((u) => u._id !== currentUser?._id);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Fetch users error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, setUsers]);

  const filteredUsers = users.filter((u) =>
    u.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full lg:w-80 bg-black flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
        <p className="text-sm text-gray-400">Connect with alumni</p>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-12"
          />
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 p-8">
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => selectUser(u)}
              className={`px-6 py-4 cursor-pointer hover:bg-gray-900 transition-colors ${
                selectedUser?._id === u._id ? 'bg-blue-900 bg-opacity-30' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.profileImg || `https://ui-avatars.com/api/?name=${u.userName}&background=4F46E5&color=fff`}
                  alt={u.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">
                    {u.userName}
                  </h4>
                  <p className="text-sm text-gray-400 truncate">
                    {u.department || 'Hmm'} · 6m
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