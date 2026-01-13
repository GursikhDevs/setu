import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const AlumniCard = ({ alumni }) => {
  const navigate=useNavigate();
  return (
    <div className='w-full h-20 p-2 flex items-center justify-between border rounded border-theme-white'>
      
      <div className='alumni-clip-path w-20 h-17 border-t-3 border-l-3 border-r-3 border-amber-50'>
        <img
          className='object-cover w-full h-full'
          src={alumni.user.profileImg
}
          alt={alumni.user.userName
}
        />
      </div>

      <div className='w-full flex flex-col gap-1 px-4'>
        <div className='border-b-2 border-theme-white'>
          <h4>{alumni.user.userName}</h4>
        </div>
        <div className='leading-4 w-fit'>
          <h4>{alumni.jobTitle}</h4>
          <h5 className='lowercase italic pl-1'>
            at {alumni.company}
          </h5>
        </div>
      </div>

      <div>
        <button onClick={()=>navigate("/login")} className='capitalize leading-4 bg-secondary-color py-1 px-3 rounded-xl'>
          {alumni.availableForMentorship ? 'open to mentorship' : 'not available'}
        </button>

        <div className='flex justify-center pt-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <FaRegStar key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlumniCard
