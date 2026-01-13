import React, { useState } from 'react'
import { Modal } from '../ui/Modal';
import AlumniProfile from './AlumniProfile';
import alumniUsers from "../../data/alumniDummyData";

const AlumniSuggestionCard = () => {

  const [openAlumniProfile, setOpenAlumniProfile] =useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const handleAlumniProfileClick = (user)=>{
    console.log(user)
    setSelectedAlumni(user);
    setOpenAlumniProfile(true)
  }

  const sendConnectRequest = (e)=>{
    e.stopPropagation();

    console.log("Connect request sent to:", alumniUsers.id);
    // API call here
  }

  return (
    <>
      {
        alumniUsers.map((user, index)=> (
          <div  key={index} onClick={() => handleAlumniProfileClick(user)} className='w-[90%] h-fit grid grid-cols-[1fr_2fr] grid-rows-1 gap-1 overflow-hidden p-2 border-2 border-white-color rounded-xl shrink-0'>
              <div className='py-1 flex items-center'>
                <img className=' w-full object-cover rounded-full' src={user.profileImage} alt={user.username} />
              </div>
              <div className='text-center px-2'>
                <h3 className='text-sm font-semibold '>{user.username}</h3>
                <h4 className='text-xs border-t'>{user.specialization}</h4>
                <button onClick={sendConnectRequest} className='text-xs cursor-pointer bg-permanent-main-color px-3 py-1 rounded-2xl '>
                  Connect+
                </button>
              </div>
        </div>
        ))
      }

      <Modal isOpen={!!openAlumniProfile} onClose={()=> setOpenAlumniProfile(null)}>
        <AlumniProfile alumni={selectedAlumni}/>
      </Modal>
    </>
  )
}

export default AlumniSuggestionCard