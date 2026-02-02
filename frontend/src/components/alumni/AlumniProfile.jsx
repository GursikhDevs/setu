import React from 'react'
import { TfiLinkedin } from "react-icons/tfi";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AlumniProfile = ({alumni}) => {
  const navigate=useNavigate();
  console.log(alumni);
  

  const handleAskForMentorship =()=>{
    console.log('handleAskForMentorship')
  }
  const handleSendMessage =async()=>{
try{
  const API=`http://localhost:3000/chat/start/${alumni.user._id}`
const res=await axios.post(API,null,{
    withCredentials: true // Include this in the config object
  });
  // console.log(res);
  const params={
    secondPersonId:alumni.user._id,
    roomId:res.data.roomId
  }
  const queryString = new URLSearchParams(params).toString();
  navigate(`/messages?${queryString}`);

}catch(err){
  console.log(err);
  
}

    console.log('handleSendMessage')
  }
  
  return (
    <div className='w-full h-full px-6 py-4 flex flex-col gap-2 overflow-y-auto bg-secondary-color'>        
      <div className='flex items-center gap-20 md:gap-30 w-full h-40'>
        <div className='w-30 h-30 relative shrink-0'>
          <img className=' w-full h-full object-cover rounded-2xl' src={alumni.user.profileImg} alt={alumni.user.userName} />
          <h3 className=' uppercase font-bold text-2xl shrink-0 leading-4.5 absolute bottom-0 left-[75%] text-white'>{alumni.user.userName}</h3>
        </div>
        
        <div className=' min-w-[50%] px-2 space-y-1'>
          <h3 className='text-2xl font-semibold'>{alumni.user.userName}</h3>
          <div className='text-sm leading-3.5'>
            <h4 >{alumni.jobTitle}</h4>

             {/* show only if company exists */}
            {alumni.company && (
              <h4 className='italic'>
                 at {alumni.company} 
              </h4>
            )}

            <div className=' flex flex-wrap gap-1 py-3'>
              <button onClick={handleAskForMentorship} className='shrink-0 uppercase text-xs font-semibold bg-amber-200 py-1 px-2 rounded-2xl '>Ask for mentorship</button>
              <button onClick={handleSendMessage}  className='shrink-0 uppercase text-xs font-semibold bg-amber-200 py-1 px-3 rounded-2xl '>send Message</button>
            </div>
          </div>
        </div>
      </div>

      <div className='dev-gif flex justify-between gap-1 text-3xl text-white-color font-Urbanist font-bold uppercase w-full h-fit px-2 items-center'>
            <h3 className='shrink-0'>{alumni.jobTitle}</h3>
            <div className='w-full h-0.5 bg-white-color'></div>
            <h3 className='shrink-0 tracking-tighter'>Batch:{alumni.batch}</h3>
      </div>

      <div className='w-full h-full p-2 gap-1 flex overflow-scroll text-black/80'>
        <div className=' bg-orange-200 w-[80%] h-full rounded-2xl p-2 font-Urbanist leading-5.5 overflow-y-scroll'>
            <ul>
              
              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Specialization</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>{alumni.specialization}</span>
              </li>

              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Skills</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>
                  {
                  alumni.skills?.map((elem, i)=>(
                    <span key={i}>
                      {` ${elem}, `}
                    </span>
                  ))
                }
                </span>
              </li>

              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Experience</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>{alumni.experience}</span>
              </li>

              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Current Role</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>{alumni.
jobTitle}</span>
              </li>

              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Company</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>{alumni.company}</span>
              </li>

              <li className='h-fit flex'>
                <span className='font-semibold font-Urbanist w-[50%] pr-1 inline-block text-right'>Location</span> : 
                <span className='w-[40%] px-1 text-left inline-block'>{alumni.location}</span>
              </li>

            </ul>
        </div>
        <div className=' bg-orange-200 w-[20%] h-full rounded-2xl flex flex-col justify-center items-center gap-3 text-2xl'>
          <SiGmail />
          <TfiLinkedin />
          <FaXTwitter />
          <FaGithub />
        </div>
      </div>
        
    </div>
  )
}

export default AlumniProfile