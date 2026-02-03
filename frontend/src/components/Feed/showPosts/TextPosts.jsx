import React, { useState } from 'react';
import { Heart, ThumbsUp, Lightbulb, Sparkles, Trophy } from 'lucide-react';


const TextPost = ({ post }) => {
  const [reactions, setReactions] = useState({
    like: post?.reactions?.like || 0,
    love: post?.reactions?.love || 0,
    insightful: post?.reactions?.insightful || 0,
    inspiring: post?.reactions?.inspiring || 0,
    celebrate: post?.reactions?.celebrate || 0,
  });
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showFull, setShowFull] = useState(false);

  const reactionButtons = [
    { id: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-600', hoverBg: 'hover:bg-blue-100' },
    { id: 'love', icon: Heart, label: 'Love', color: 'text-rose-600', hoverBg: 'hover:bg-rose-100' },
    { id: 'insightful', icon: Lightbulb, label: 'Insightful', color: 'text-amber-600', hoverBg: 'hover:bg-amber-100' },
    { id: 'inspiring', icon: Sparkles, label: 'Inspiring', color: 'text-purple-600', hoverBg: 'hover:bg-purple-100' },
    { id: 'celebrate', icon: Trophy, label: 'Celebrate', color: 'text-emerald-600', hoverBg: 'hover:bg-emerald-100' },
  ];

  const handleReaction = (reactionId) => {
    if (selectedReaction === reactionId) {
      setReactions(prev => ({ ...prev, [reactionId]: prev[reactionId] - 1 }));
      setSelectedReaction(null);
    } else {
      if (selectedReaction) {
        setReactions(prev => ({ ...prev, [selectedReaction]: prev[selectedReaction] - 1 }));
      }
      setReactions(prev => ({ ...prev, [reactionId]: prev[reactionId] + 1 }));
      setSelectedReaction(reactionId);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <article className="w-[95%] max-w-2xl h-fit mx-auto shrink-0 bg-main-color text-theme-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 shadow-sm shadow-theme-white hover:shadow-lg hover:border-slate-300">
      <div className="w-full h-fit p-3 md:px-6 pb-0">
        <div className="flex items-center gap-4 mb-1 border-b border-gray-300 pb-2">

            {/* add empty user avtar for default */}
          <img
            src={post?.author?.profileImage || '/images/empty-user.webp'}
            alt={post?.author?.name || 'User'}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-semibold text-base truncate">
              {post?.author?.name || 'Anonymous'}
            </h3>
            <time className="text-sm opacity-80">
              {formatTime(post?.createdAt || new Date())}
            </time>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">

            {/* //changes */}
          <p className="text-sm leading-5.5  whitespace-pre-wrap">
            {showFull ? post?.text : post?.text?.slice(0, 600) + "..."}
              {post?.text?.length > 600 && (
                <span className='text-xs cursor-pointer hover:text-secondary-color' onClick={() => setShowFull(!showFull)}>
                  {showFull ? " show less" : " read more"}
                </span>
              )}
          </p>
        </div>

        <div className="p-2 mt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 md:gap-3">
            {reactionButtons.map((reaction) => {
              const Icon = reaction.icon;
              const isActive = selectedReaction === reaction.id;
              const count = reactions[reaction.id];
              
              return (
                <button
                  key={reaction.id}
                  onClick={() => handleReaction(reaction.id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? `${reaction.color} bg-opacity-10 ${reaction.hoverBg.replace('hover:', '')}` 
                      : ` hover:text-slate-700 ${reaction.hoverBg}`
                  }`}
                >
                  <Icon 
                    className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-xs font-medium md:block ${isActive ? 'block' : 'hidden'}`}>
                    {count > 0 && <span className="mr-1">{count}</span>}
                    {reaction.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TextPost;