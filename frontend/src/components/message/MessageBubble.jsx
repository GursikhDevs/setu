//OM namah sivay
//OM namah sivay
import React from 'react';
import { useAuthStore } from '../../store/authStore';

// ... rest of the code (keep same as before)

const MessageBubble = ({ message }) => {
  const { user } = useAuthStore();
  // console.log(user);
  
  // console.log("The sender is: ",message.sender, "and i am: ",user._id);
  
  const isMyMessage = message.sender === user?._id;

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex items-start text-white-color gap-3 mb-6 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      {!isMyMessage && (
        <img
          src={`https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff`}
          alt="User"
          className="w-10 h-10 rounded-full shrink-0"
        />
      )}
      
      <div
        className={`max-w-xs lg:max-w-md px-5 py-2 rounded-3xl ${
          isMyMessage
            ? 'bg-secondary-color rounded-br-md'
            : 'bg-forest-green-600 rounded-bl-md'
        }`}
      >
        <p className="text-sm text-white-color leading-relaxed wrap-break-word">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;