import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { playMagicLampAnimation } from "../../animations/magicLampAnimation";

import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GiMagicLamp } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { SiHomebridge } from "react-icons/si";
import { FiPlusCircle } from "react-icons/fi";
import Tooltip from "../ui/ToolTip";

const Sidebar = () => {
  const smokeRefs = useRef([]);
  const isAnimating = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  const SIDEBAR_ROUTES = {
    home: "/feed",
    smartRecommendation: "/feed/smart-recommendation",
    messages: "/feed/messages",
    createPost: "/feed/create-post",
    search: "/feed/search",
    chatBot: "/feed/chat-bot",
    userProfile: "/feed/user-profile",
  };
  const handleSidebarNavigate = (path) => {
    if (location.pathname === path) return
    navigate(path);
  };

  // smart recommendation click handler
  const handleLampClick = (path) => {
    //if Already on target page → disable
    if (location.pathname === path) return;

    // else Prevent double-trigger
    if (isAnimating.current) return;

    isAnimating.current = true;

    playMagicLampAnimation(smokeRefs.current, () => {
      isAnimating.current = false;
      navigate(path);
    });
  };

  return (
    <aside className='w-20 h-dvh flex flex-col items-center justify-between border-r border-theme-white'>
      
      {/* logo */}
      <div className='w-20 h-20'>
        <img
          className='w-full h-full object-cover'
          src="/images/setu-logo2.svg"
          alt="setu logo"
        />
      </div>

      {/* menu icons */}
      <div className='text-theme-white space-y-4 flex flex-col items-center text-3xl -mt-10'>
        
        <Tooltip text="Home">
          <IoHome 
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.home)} 
            className="cursor-pointer" 
          />
        </Tooltip>

        <div className="relative w-fit">
          {/* Smoke elements */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            {[...Array(7)].map((_, i) => (
              <span
                key={i}
                ref={(el) => (smokeRefs.current[i] = el)}
                className="absolute w-5 h-5 rounded-full bg-emerald-200/40 blur-md opacity-0 scale-0 willChange: transform, opacity"                style={{ left: `${Math.random() * 20 - 10}px` }}
              />
            ))}
          </div>
          
          <Tooltip text="Smart Recommendations">
            <GiMagicLamp 
              onClick={() => handleLampClick(SIDEBAR_ROUTES.smartRecommendation)}
              className="cursor-pointer hover:scale-110 transition-transform " 
            />
          </Tooltip>

        </div>

        <Tooltip text="Messages">
          <TbMessage 
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.messages)} 
            className="cursor-pointer" 
          />
        </Tooltip>

        <Tooltip text="Create Post">
          <FiPlusCircle 
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.createPost)}
            className="cursor-pointer" 
          />
        </Tooltip>

        <Tooltip text="Search">
          <FaSearch 
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.search)}
            className="cursor-pointer" 
          />
        </Tooltip>

        {/* <IoMdNotifications /> */}

        <Tooltip text="Chat Bot">
          <AiOutlineAliwangwang 
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.chatBot)}
            className="cursor-pointer" 
          />
        </Tooltip>

        {/* <SiHomebridge /> */}
        {/* <IoSettingsOutline /> */}
        
      </div>

      {/* profile */}
      <div className='w-[70%] max-h-15 min-h-15 rounded-t-4xl flex justify-center items-center bg-secondary-color'>
        <Tooltip text="Profile">
          <img
            onClick={() => handleSidebarNavigate(SIDEBAR_ROUTES.userProfile)}
            className='rounded-4xl w-[80%] cursor-pointer'
            src="/images/empty.jpg"
            alt="profile image"
          />
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
