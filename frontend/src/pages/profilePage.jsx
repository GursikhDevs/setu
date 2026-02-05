import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore.js";
import axios from "axios";



const Pre_API_URL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [copied, setCopied] = useState(false);

  const { user } = useAuthStore();
//   console.log(user);
  


  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);


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


//   const { user: profileUser, connectionsCount, posts } = profileData;
//   const isOwner = user._id === profileUser._id;



  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this post?");
    if (ok) {
      console.log("Deleted post:", id);
    }
  };
  const handleCopy = async () => {
    const currentUrl = window.location.href; // full current path

    await navigator.clipboard.writeText(currentUrl);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <p className="text-theme-white">Loading...</p>;
  if (!profileData) return null;

 
  const { user: profileUser, connectionsCount, posts } = profileData;
  
  const isOwner = true;
  // console.log(ProfileUser);
  
    return (
      <>
      {profileData&&(
        <div className="w-full h-full text-theme-white p-4 md:p-8 overflow-scroll">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


        {/* LEFT SIDEBAR */}
        <div className=" h-fit border-2 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={profileUser.profileImg}
              className="w-32 h-32 rounded-full object-cover border-4 border-theme-white"
            />
            {isOwner && (
              <span className="absolute bottom-1 right-1 bg-theme-white text-main-color w-6 h-6 rounded-full flex items-center justify-center font-bold">
                +
              </span>
            )}
          </div>


          <h2 className="text-xl font-bold mt-4">{profileUser.userName}</h2>
          <p className="text-sm opacity-90 mt-1">{profileUser.department}</p>


          <p className="text-xs opacity-80 mt-2">🏢 Work: {profileUser.work}</p>
          <p className="text-xs opacity-80">📍 {profileUser.location}</p>


          <div className="bg-secondary-color mt-4 px-4 py-2 rounded-full text-sm">
            Connection : {connectionsCount}
          </div>


          <div className="w-[80%] relative">
            <button
            onClick={() => navigate("/profile/edit")}
            className="mt-4 bg-secondary-color w-full py-2 rounded-xl hover:scale-105 active:scale-95 transition-all hover-shadow-sm shadow-theme-white"
          >
            Edit profile
          </button>


          <button 
          onClick={handleCopy}
          className="mt-2 bg-secondary-color w-full py-2 rounded-xl hover:scale-105 active:scale-95 transition-all hover-shadow-sm shadow-theme-white"
          >
            Share profile
          </button>
          {copied && (
            <div className="absolute top-full mt-2 px-3 py-1 text-sm bg-forest-green-600 rounded shadow-lg">
              Profile link copied to clipboard ✅
            </div>
          )}
          </div>
        </div>


        {/* RIGHT CONTENT */}
        <div className="md:col-span-3 space-y-6">


          {/* BIO */}
          <div className="border rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-forest-green-600 flex items-center justify-center text-white-color text-lg font-bold">
                ☰
              </div>


              <div>
                <h3 className="text-lg font-semibold">Bio</h3>
                <p className="text-sm opacity-90 mt-2">
                  {profileUser.description}
                </p>
              </div>
            </div>
          </div>



          {/* POSTS */}
          <div className="rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-theme-white flex items-center justify-center text-black text-lg font-bold">
                🔖
              </div>


              <h3 className="text-lg font-semibold">
                Posts {posts.length}
              </h3>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {posts.map((post) => (
                <div key={post._id} className="relative">
                  <img
                    src={post.url}
                    className="rounded-2xl h-36 w-full object-cover"
                  />


                  {isOwner && (
                    <>
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === post._id ? null : post._id)
                        }
                        className="absolute top-2 right-2 bg-black/70 rounded-full w-4 h-8 flex items-center justify-center text-white"
                      >
                        ⋮
                      </button>


                      {openMenu === post._id && (
                        <div className="absolute top-10 right-5 bg-main-color rounded-lg text-xs overflow-hidden">
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="px-4 py-2 hover:bg-red-600 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )}
  </>
  );
};


export default Profile;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuthStore } from "../store/authStore.js";
// import axios from "axios";



// const Pre_API_URL = import.meta.env.VITE_API_URL;
// const Profile = () => {
//   const navigate = useNavigate();
//   const [openMenu, setOpenMenu] = useState(null);

//   const { user } = useAuthStore();
// //   console.log(user);
  


//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `${Pre_API_URL}/profile/${user._id}`,
//           { withCredentials: true }
//         );
//         console.log(res.data);
        
//         setProfileData(res.data);
        
  
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchProfile();
//   }, []);


// //   const { user: profileUser, connectionsCount, posts } = profileData;
// //   const isOwner = user._id === profileUser._id;



//   const handleDelete = (id) => {
//     const ok = window.confirm("Are you sure you want to delete this post?");
//     if (ok) {
//       console.log("Deleted post:", id);
//     }
//   };

//   if (loading) return <p className="text-white">Loading...</p>;
//   if (!profileData) return null;

 
//   const { user: ProfileUser, connectionsCount, posts } = profileData;
//   const isOwner = true;
//   // console.log(ProfileUser);
  
//     return (
//         <>
//         {profileData&&(<div className="min-h-screen bg-black text-white p-4 md:p-8">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


//         {/* LEFT SIDEBAR */}
//         <div className="bg-[#0A3CFF] rounded-3xl p-6 flex flex-col items-center text-center">
//           <div className="relative">
//             <img
//               src={ProfileUser.profileImg}
//               className="w-32 h-32 rounded-full object-cover border-4 border-white"
//             />
//             {isOwner && (
//               <span className="absolute bottom-1 right-1 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center font-bold">
//                 +
//               </span>
//             )}
//           </div>


//           <h2 className="text-xl font-bold mt-4">{ProfileUser.userName}</h2>
//           <p className="text-sm opacity-90 mt-1">{ProfileUser.department}</p>


//           <p className="text-xs opacity-80 mt-2">🏢 Work: {ProfileUser.work}</p>
//           <p className="text-xs opacity-80">📍 {ProfileUser.location}</p>


//           <div className="bg-black mt-4 px-4 py-2 rounded-full text-sm">
//             Connection : {connectionsCount}
//           </div>


//           <button
//             onClick={() => navigate("/profile/edit")}
//             className="mt-4 bg-black w-full py-2 rounded-xl"
//           >
//       Edit profile
//           </button>


//           <button className="mt-2 bg-black w-full py-2 rounded-xl">
//             Share profile
//           </button>
//         </div>


//         {/* RIGHT CONTENT */}
//         <div className="md:col-span-3 space-y-6">


//           {/* BIO */}
//           <div className="bg-[#0A3CFF] rounded-3xl p-6">
//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 rounded-xl bg-cyan-300 flex items-center justify-center text-black text-lg font-bold">
//                 ☰
//               </div>


//               <div>
//                 <h3 className="text-lg font-semibold">Bio</h3>
//                 <p className="text-sm opacity-90 mt-2">
//                   {ProfileUser.description}
//                 </p>
//               </div>
//             </div>
//           </div>


//           {/* POSTS */}
//           <div className="bg-[#0A3CFF] rounded-3xl p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-10 h-10 rounded-xl bg-emerald-300 flex items-center justify-center text-black text-lg font-bold">
//                 🔖
//               </div>


//               <h3 className="text-lg font-semibold">
//                 Posts {posts.length}
//               </h3>
//             </div>


//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {posts.map((post) => (
//   <div key={post._id} className="relative">
//                   <img
//                     src={post.media.url}
//                     className="rounded-2xl h-36 w-full object-cover"
//                   />


//                   {isOwner && (
//                     <>
//                       <button
//                         onClick={() =>
//                           setOpenMenu(openMenu === post._id ? null : post._id)
//                         }
//                         className="absolute top-2 right-2 bg-black/70 rounded-full w-8 h-8 flex items-center justify-center text-white"
//                       >
//                         ⋮
//                       </button>


//                       {openMenu === post._id && (
//                         <div className="absolute top-10 right-2 bg-black rounded-lg text-sm overflow-hidden">
//                           <button
//                             onClick={() => handleDelete(post._id)}
//                             className="px-4 py-2 hover:bg-red-600 w-full text-left"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>


//         </div>
//       </div>
//     </div>)}
//     </>
//   );
// };


// export default Profile;