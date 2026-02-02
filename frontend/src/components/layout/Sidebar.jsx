import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GiMagicLamp } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { SiHomebridge } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className='w-20 h-dvh flex flex-col items-center justify-between'>
      
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
        <IoHome onClick={() => navigate('/feed')} className="cursor-pointer" />
        <GiMagicLamp />
        <TbMessage onClick={() => navigate('/messages')} className="cursor-pointer" />
        <FaSearch />
        <IoMdNotifications />
        <AiOutlineAliwangwang />
        <SiHomebridge />
        <IoSettingsOutline onClick={() => navigate('/settings')} className="cursor-pointer" />
      </div>

      {/* profile */}
      <div className='w-[70%] max-h-15 min-h-15 rounded-t-4xl flex justify-center items-center bg-secondary-color'>
        <img
          className='rounded-4xl w-[80%]'
          src="/images/vi.jpg"
          alt="profile image"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
