import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/Modal';
import AlumniProfile from './AlumniProfile';
// import alumniUsers  from "../../data/alumniDummyData";
import {fetchSuggestedAlumni} from '../../data/alumniDummyData';
import axios from 'axios';

const Pre_API_URL = import.meta.env.VITE_API_URL;
const AlumniSuggestionCard = () => {
  const [alumniUsers,setAlumniUsers]=useState("");

  const [openAlumniProfile, setOpenAlumniProfile] =useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  useEffect(()=>{

 fetchSuggestedAlumni()
      .then(data => {
        setAlumniUsers(data)
        // console.log(data);
        
      })
      .catch(() => {
        console.log("something went wrong");
        
      })
      // .finally(() => {
      //   setLoading(false)
      // })
  },[]);

  const handleAlumniProfileClick = (user)=>{

    // console.log(user)
    setSelectedAlumni(user);
    setOpenAlumniProfile(true)
  }

  const sendConnectRequest = async(e,Otherid)=>{
    e.stopPropagation();
    console.log(Otherid);
    const API=`${Pre_API_URL}/connection/makeconnection/${Otherid}`
    try{
const res = await axios.get(API,{
    withCredentials: true 
});
console.log(res);

    }catch(err){
      console.log(err);
    }
    // console.log("Connect request sent to:", alumniUsers.id);
    // API call here
  }

  return (
    <>
    {
      alumniUsers&&(
        alumniUsers.map((user, index)=> (
          <div  key={index}  className='w-[90%] h-fit grid grid-cols-[1fr_2fr] grid-rows-1 gap-1 overflow-hidden p-2 border-2 border-white-color rounded-xl shrink-0'>
              <div onClick={() => handleAlumniProfileClick(user)} className='py-1 flex items-center'>
                <img className=' w-full object-cover rounded-full' src={user.user.profileImg} alt={user.user.userName} />
              </div>
              <div className='text-center px-2'>
                <h3 className='text-sm font-semibold '>{user.user.userName}</h3>
                <h4 className='text-xs border-t'>{user.jobTitle}</h4>
                <button onClick={(e)=>sendConnectRequest(e,user.user._id)} className='text-xs cursor-pointer bg-permanent-main-color px-3 py-1 rounded-2xl '>
                  Connect+
                </button>
              </div>
        </div>
        ))
      )
       
    }<Modal isOpen={!!openAlumniProfile} onClose={()=> setOpenAlumniProfile(null)}>
        <AlumniProfile alumni={selectedAlumni}/>
      </Modal>
      

     
    </>
  )
}

export default AlumniSuggestionCard