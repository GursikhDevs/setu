import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserCard = ({ user, index }) => {
  const Pre_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // Navigate to user profile page
    navigate(`/profile/${user.username || user.id}`);
  };

  const handleConnect = (e) => {
    e.stopPropagation();
    // Add connect functionality
    console.log('Connect with:', user.name);
  };

  const handleMessage =async (e) => {
    // e.stopPropagation();
    // Add message functionality
    console.log('Message:', user._id);
    try{
  const API=`${Pre_API_URL}/chat/start/${user._id}`
const res=await axios.post(API,null,{
    withCredentials: true // Include this in the config object
  });
  // console.log(res);
  const params={
    secondPersonId:user._id,
    roomId:res.data.roomId
  }
  const queryString = new URLSearchParams(params).toString();
  navigate(`/feed/messages?${queryString}`);

}catch(err){
  console.log(err);
  
}
  };

  return (
    <div 
      className='group relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1a4a35]/60 to-[#124a33]/60 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1'
      onClick={handleViewProfile}
      style={{
        animationDelay: `${index * 0.05}s`
      }}
    >
      {/* Hover linear effect */}
      <div className='absolute inset-0 bg-linear-to-br from-green-400/0 via-green-400/0 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      
      {/* Shimmer effect on hover */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'>
        <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-green-400/10 to-transparent' />
      </div>

      <div className='relative p-6'>
        {/* Header Section */}
        <div className='flex items-start gap-4 mb-4'>
          {/* Avatar */}
          <div className='relative shrink-0'>
            <div className='w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-green-400/30 to-green-600/30 border-2 border-green-400/40 group-hover:border-green-400/70 transition-all duration-300 flex items-center justify-center group-hover:scale-110'>
              {user.profileImg || user.avatar || user.image ? (
                <img 
                  src={user.profileImg || user.avatar || user.image} 
                  alt={user.name}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-green-300">${(user.name || user.userName || 'U')[0].toUpperCase()}</span>`;
                  }}
                />
              ) : (
                <span className='text-2xl font-bold text-green-300'>
                  {(user.name || user.userName || 'U')[0].toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Online indicator */}
            {user.isOnline && (
              <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#1a4a35] shadow-lg'>
                <div className='absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75' />
              </div>
            )}
          </div>

          {/* Name and Username */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-bold text-green-50 truncate group-hover:text-green-300 transition-colors mb-1'>
              {user.userName || 'Unknown User'}
            </h3>
            <p className='text-sm text-green-300/60 truncate'>
              @{user.userName || user.handle || 'username'}
            </p>
          </div>
        </div>

        {/* Role and Batch */}
        <div className='space-y-2 mb-4'>
          {user.role && (
            <div className='flex items-center gap-2 text-sm text-green-200/80'>
              <svg className='w-4 h-4 text-green-400/60 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              <span className='truncate'>{user.role}</span>
            </div>
          )}
          
          {user.batch && (
            <div className='flex items-center gap-2 text-sm text-green-200/80'>
              <svg className='w-4 h-4 text-green-400/60 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
              </svg>
              <span>Batch {2025-user.yearsOfExperience}</span>
            </div>
          )}

          {user.location && (
            <div className='flex items-center gap-2 text-sm text-green-200/80'>
              <svg className='w-4 h-4 text-green-400/60 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              <span className='truncate'>{user.location}</span>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {user.skills && user.skills.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-4'>
            {user.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className='px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-colors'
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className='px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400/60'>
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Bio/Description (if available) */}
        {user.bio && (
          <p className='text-sm text-green-200/60 mb-4 line-clamp-2'>
            {user.bio}
          </p>
        )}

        {/* Divider */}
        <div className='h-px bg-linear-to-r from-transparent via-green-400/20 to-transparent mb-4' />

        {/* Action Buttons */}
        <div className='flex gap-2'>
          <button 
            onClick={handleViewProfile}
            className='flex-1 py-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 font-medium transition-all duration-200 group-hover:shadow-lg group-hover:shadow-green-500/20 text-sm'
          >
            View Profile
          </button>
          
          <button
            onClick={()=>handleMessage}
            className='p-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-green-500/20'
            title='Send Message'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
            </svg>
          </button>

          <button
            onClick={handleConnect}
            className='p-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-green-500/20'
            title='Connect'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;