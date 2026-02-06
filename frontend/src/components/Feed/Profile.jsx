import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/Modal';
import EditProfile from './EditProfile';
import { useAuthStore } from '../../store/authStore';
import axios from "axios";

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const Pre_API_URL = import.meta.env.VITE_API_URL;
  const { user } = useAuthStore();

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${Pre_API_URL}/profile/${user._id}`,
          { withCredentials: true }
        );
        console.log(res.data);
        
        setProfileData(res.data);
        
  
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);

const [openEditProfile, setOpenEditProfile] = useState(false);

  const handleEditProfileButton = ()=>{
    setOpenEditProfile(true);
    console.log("implement edit profile click")
  }
if(!profileData)return;
  const { user: profileUser, connectionsCount, posts } = profileData;

  return (
  <>
  {profileData&&(<div className='w-full h-full flex flex-col items-center'>
        <img className='h-[40%] rounded-full' src={profileUser.profileImg} alt="Profile" />

          <h3 className="text-xl font-semibold border-b">{profileUser.userName}</h3>

          <p className="text-sm leading-4 pt-1 pb-2">
           {profileUser.department}
          </p>

          <p className="text-sm italic leading-4">
           {profileUser.role}
          </p>

          <button onClick={handleEditProfileButton} className='bg-main-color cursor-pointer text-sm py-1 px-4 mt-2 rounded-r-2xl border-l-2'>
            Edit profile
          </button>

          {/* using modal for showing a full screen overlay, then the instance is shown  */}
          <Modal isOpen={openEditProfile} onClose={()=> setOpenEditProfile(false)}>
            <EditProfile />
          </Modal>
    </div>)}
  </>
    
  )
}

export default Profile













// import React, { useState } from 'react'
// import { Modal } from '../ui/Modal';
// import EditProfile from './EditProfile';

// const Profile = () => {

// const [openEditProfile, setOpenEditProfile] = useState(false);

//   const handleEditProfileButton = ()=>{
//     setOpenEditProfile(true);
//     console.log("implement edit profile click")
//   }

//   return (
//     <div className='w-full h-full flex flex-col items-center'>
//         <img className='h-[40%] rounded-full' src="/images/vi.jpg" alt="Profile" />

//           <h3 className="text-xl font-semibold border-b">NameExample69</h3>

//           <p className="text-sm leading-4 pt-1 pb-2">
//             MERN Stack developer, Gen AI, Graphics...
//           </p>

//           <p className="text-sm italic leading-4">
//             Uttarakhand, India
//           </p>

//           <button onClick={handleEditProfileButton} className='bg-main-color cursor-pointer text-sm py-1 px-4 mt-2 rounded-r-2xl border-l-2'>
//             Edit profile
//           </button>

//           {/* using modal for showing a full screen overlay, then the instance is shown  */}
//           <Modal isOpen={openEditProfile} onClose={()=> setOpenEditProfile(false)}>
//             <EditProfile />
//           </Modal>
//     </div>
//   )
// }

// export default Profile