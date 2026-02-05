import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const Pre_API_URL = import.meta.env.VITE_API_URL;
const SmartCards = () => {
  const [status, setStatus] = useState("processing");
  const [alumniData, setAlumniData] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef([]);
  const processingCardRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();

  /* Fetch alumni recommendations from backend */
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setStatus("processing");
        setError(null);

        // Get user token from localStorage (or wherever you store it)
        const token = localStorage.getItem('authToken');
        // OR get userId if you're using that instead
        // const userId = localStorage.getItem('userId');

        // const response = await fetch('http://localhost:3000/suggestion/smartAlumniSuggestion', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // Send authentication token
        //     'Authorization': `Bearer ${token}`,
        //     // OR if your API uses a different auth method:
        //     // 'X-User-Id': userId,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const data = await response.json();
        const API=`${Pre_API_URL}/suggestion/smartAlumniSuggestion`;
        const res=await axios.get(API,{
          withCredentials:true
        });
        // console.log("smartRecomendKaData: ",res);
        
        const data=res.data;
        // console.log(data);
        
        
        // Assuming your API returns data in format: { recommendations: [...] }
        // Adjust based on your actual API response structure
        setAlumniData(data.recommendations ||data.suggestions ||data);
        
        // Add a small delay for better UX (optional)
        setTimeout(() => {
          setStatus("done");
        }, 1000);

      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
        setStatus("error");
        console.log(error)
      }
    };

    fetchRecommendations();
  }, []); // Run once on component mount

  /* Initialize cards as hidden */
  useEffect(() => {
    const cards = cardsRef.current;

    if (location.pathname === "/feed/smart-recommendation" && alumniData.length > 0) {
      cards.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();

        const centerX =
          window.innerWidth / 2 - (rect.left + rect.width / 2) + 55;
        const centerY =
          window.innerHeight / 2 - (rect.top + rect.height / 2) + 50;

        gsap.to(card, {
          opacity: 0,
          scale: 0,
          x: centerX,
          y: centerY,
        });
      });
    }
  }, [location.pathname, alumniData]);

  /* Main Animation Sequence */
  useEffect(() => {
    if (status !== "done" || alumniData.length === 0) return;

    const tl = gsap.timeline();

    // Step 1: Shrink and fade processing card
    tl.to(processingCardRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Step 2: Burst cards from center
    tl.to(cardsRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power",
      stagger: {
        amount: 0.4,
        from: "center",
      },
    });

    // Step 3: Spread cards in arc formation
    tl.to(
      cardsRef.current,
      {
        x: (i) => {
          const angle = (i - 1) * 25;
          return Math.sin((angle * Math.PI) / 180) * 160;
        },
        y: (i) => {
          const angle = (i - 1) * 35;
          return -Math.abs(Math.cos((angle * Math.PI) / 180) * 40);
        },
        rotation: (i) => (i - 1) * 20,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.2"
    );

    // Step 4: Return to grid layout
    tl.to(
      cardsRef.current,
      {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.04,
      },
      "+=0.1"
    );

    // Step 5: Start continuous floating animation
    tl.add(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.to(card, {
          y: gsap.utils.random(-12, 12),
          x: gsap.utils.random(-8, 8) + 5,
          rotation: gsap.utils.random(-2, 2),
          duration: gsap.utils.random(2.5, 3.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2 + 1,
        });
      });
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(cardsRef);
    };
  }, [status, alumniData]);

  return (
    <div className='h-full w-full flex justify-center items-center relative overflow-hidden '>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Processing Card */}
      <div
        ref={processingCardRef}
        className="absolute"
        style={{
          opacity: status === "processing" ? 1 : 0,
          pointerEvents: status === "processing" ? "auto" : "none",
        }}
      >
        <div className="w-60 h-90 rounded-3xl bg-linear-to-br from-[#1a6b47]/90 to-[#0f4a2f]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-green-50 border border-green-400/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-green-400/0 via-green-400/5 to-green-400/0 animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[90%] h-[60%] rounded-full border-2 border-green-400/20 animate-spin-slow" />
            <div className="absolute w-[70%] h-[45%] rounded-full border-2 border-green-300/10 animate-spin-reverse" />
          </div>

          <div className="relative z-10 flex flex-col items-center py-2 px-8">
            <div className="w-fit h-fit p-3 rounded-full bg-linear-to-br from-green-400/30 to-green-600/30 flex items-center justify-center mb-6 backdrop-blur-sm border-2 border-green-400/40 shadow-lg">
              <svg
                className="w-12 h-12 text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            <h2 className="text-2xl leading-5 font-Urbanist font-bold tracking-wide mb-3 text-center">
              Analyzing Your Profile
            </h2>

            <div className="flex gap-2.5 my-6">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-3 h-3 bg-green-400 rounded-full animate-bounce shadow-lg shadow-green-400/50"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>

            <p className="text-sm text-green-100/80 text-center max-w-[300px] leading-relaxed">
              Finding the perfect alumni matches based on your skills, interests,
              and career aspirations
            </p>

            <div className="mt-6 w-48 h-1 bg-green-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-green-400 to-emerald-400 rounded-full animate-progress" />
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {status === "error" && (
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-lg font-semibold">Failed to load recommendations</p>
            {/* <p className="text-sm text-green-200/60 mt-2">{error}</p> */}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Alumni Cards Container */}
      {alumniData.length > 0 && (
        <div
          ref={containerRef}
          className="flex flex-wrap gap-6 justify-center w-full h-full max-w-6xl relative z-10 py-15 overflow-scroll"
        >
          {alumniData.map((alumni, i) => (
            <div
              key={alumni.id || alumni.user._id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="w-55 h-80 rounded-2xl bg-linear-to-br from-[#1a6b47]/95 to-[#124a33]/95 backdrop-blur-sm text-green-50 p-6 shadow-2xl flex flex-col border border-green-400/30 hover:border-green-400/60 transition-all duration-300 hover:shadow-green-500/20 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-400/0 via-green-400/0 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="relative w-20 h-20 mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-linear-to-br from-green-400/40 to-green-600/40 flex items-center justify-center text-3xl border-2 border-green-400/40 group-hover:border-green-400/70 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <img 
                      className='object-cover w-full h-full' 
                      src={alumni.user.profileImg || alumni.profile_image || "/images/default-avatar.jpg"} 
                      alt={`${alumni.user.userName} profile`}
                      onError={(e) => {
                        e.target.src = "/images/default-avatar.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-green-400 text-green-900 text-xs font-bold flex items-center justify-center shadow-lg border-2 border-[#1a6b47]">
                    #{i + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-green-50 leading-tight mb-1">
                  {alumni.user.userName}
                </h3>
                <p className="text-sm text-green-200/70 mb-4">{alumni.jobTitle}</p>

                <div className="w-full h-px bg-linear-to-r from-transparent via-green-400/30 to-transparent mb-4" />

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-green-300">
                      {alumni.match || alumni.score || 0}%
                    </span>
                    <span className="text-sm text-green-200/60">Match Score</span>
                  </div>

                  <div className="w-full h-2 bg-green-900/50 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-linear-to-r from-green-400 via-emerald-400 to-green-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-green-400/50"
                      style={{
                        width: status === "done" ? `${alumni.match || alumni.score || 0}%` : "0%",
                        transitionDelay: `${i * 0.15 + 0.8}s`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-green-200/50 mt-3 flex items-center gap-1">
                    Based on skills & interests
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SmartCards






















// import React, { useEffect, useRef, useState } from 'react'
// import gsap from "gsap";
// import {useLocation} from 'react-router-dom';

// const alumniData = [
//   { name: "Aarav Mehta", role: "AI Engineer", match: 92, profileImg: "/images/vi.jpg" },
//   { name: "Riya Sharma", role: "Product Designer", match: 89, profileImg: "/images/vi.jpg" },
//   { name: "Kunal Verma", role: "Data Scientist", match: 87, profileImg: "/images/vi.jpg" },
// ];

// const SmartCards = () => {
//   const [status, setStatus] = useState("processing");
//   const cardsRef = useRef([]);
//   const processingCardRef = useRef(null);
//   const containerRef = useRef(null);
//   const location = useLocation();


//     /* Processing with random delay (5-7 seconds) */
//     useEffect(() => {
//       const delay = 5000 + Math.random() * 2000;
//       const timer = setTimeout(() => {
//         setStatus("done");
//       }, delay);
//       return () => clearTimeout(timer);
//     }, []);

//     /* Initialize cards as hidden */
//     useEffect(() => {
//       // Set cards invisible from the start
//       const cards = cardsRef.current;

//       if (location.pathname === "/feed/smart-recommendation") {
//       cards.forEach((card) => {
//         const rect = card.getBoundingClientRect();

//         const centerX =
//           window.innerWidth / 2 - (rect.left + rect.width / 2) + 55;
//         const centerY =
//           window.innerHeight / 2 - (rect.top + rect.height / 2) + 50;

//         gsap.to(card, {
//           opacity: 0,
//           scale: 0,
//           x: centerX,
//           y: centerY,
//         });
//       });
//     }
//     }, [location.pathname]);


//   /* Main Animation Sequence */
//   useEffect(() => {
//     if (status !== "done") return;

//     const tl = gsap.timeline();

//     // Step 1: Shrink and fade processing card
//     tl.to(processingCardRef.current, {
//       scale: 0.9,
//       opacity: 0,
//       duration: 0.4,
//       ease: "power2.in",
//     });

//     // Step 2: Burst cards from center
//     tl.to(cardsRef.current, {
//       opacity: 1,
//       scale: 1,
//       duration: 0.5,
//       ease: "power",
//       stagger: {
//         amount: 0.4,
//         from: "center",
//       },
//     });

//     // Step 3: Spread cards in arc formation
//     tl.to(
//       cardsRef.current,
//       {
//         x: (i) => {
//           console.log(i)
//           const angle = (i - 1) * 25; // -50, -25, 0, 25, 50 degrees
//           return Math.sin((angle * Math.PI) / 180) * 160;
//         },
//         y: (i) => {
//           const angle = (i - 1) * 35;
//           return -Math.abs(Math.cos((angle * Math.PI) / 180) * 40);
//         },
//         rotation: (i) => (i - 1) * 20, // Slight rotation for effect
//         duration: 0.3,
//         ease: "power2.out",
//         stagger: 0.06,
//       },
//       "-=0.2"
//     );

//     // Step 4: Return to grid layout
//     tl.to(
//       cardsRef.current,
//       {
//         x: 0,
//         y: 0,
//         rotation: 0,
//         duration: 0.5,
//         ease: "power2.inOut",
//         stagger: 0.04,
//       },
//       "+=0.1"
//     );

//     // Step 5: Start continuous floating animation
//     tl.add(() => {
//       cardsRef.current.forEach((card, i) => {
//         if (!card) return;

//         gsap.to(card, {
//           y: gsap.utils.random(-12, 12),
//           x: gsap.utils.random(-8, 8) + 5,
//           rotation: gsap.utils.random(-2, 2),
//           duration: gsap.utils.random(2.5, 3.5),
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: i * 0.2 + 1,
//         });
//       });
//     });

//     return () => {
//       tl.kill();
//       gsap.killTweensOf(cardsRef);
//     };
//   }, [status]);


//   return (
//     <div className='h-full w-full flex justify-center items-center relative overflow-hidden '>
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
//       </div>


//       {/* Processing Card */}
//       <div
//         ref={processingCardRef}
//         className="absolute"
//         style={{
//           opacity: status === "processing" ? 1 : 0,
//           pointerEvents: status === "processing" ? "auto" : "none",
//         }}
//       >
//         <div className="w-60 h-90 rounded-3xl bg-linear-to-br from-[#1a6b47]/90 to-[#0f4a2f]/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-green-50 border border-green-400/30 relative overflow-hidden">
//           {/* Animated linear overlay */}
//           <div className="absolute inset-0 bg-linear-to-tr from-green-400/0 via-green-400/5 to-green-400/0 animate-pulse" />

//           {/* Spinning rings */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-[90%] h-[60%] rounded-full border-2 border-green-400/20 animate-spin-slow" />
//             <div className="absolute w-[70%] h-[45%] rounded-full border-2 border-green-300/10 animate-spin-reverse" />
//           </div>

//           <div className="relative z-10 flex flex-col items-center py-2 px-8">
//             {/* Central icon */}
//             <div className="w-fit h-fit p-3 rounded-full bg-linear-to-br from-green-400/30 to-green-600/30 flex items-center justify-center mb-6 backdrop-blur-sm border-2 border-green-400/40 shadow-lg">
//               <svg
//                 className="w-12 h-12 text-green-300"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                 />
//               </svg>
//             </div>

//             <h2 className="text-2xl leading-5 font-Urbanist font-bold tracking-wide mb-3 text-center">
//               Analyzing Your Profile
//             </h2>

//             {/* Animated dots */}
//             <div className="flex gap-2.5 my-6">
//               {[0, 1, 2].map((i) => (
//                 <span
//                   key={i}
//                   className="w-3 h-3 bg-green-400 rounded-full animate-bounce shadow-lg shadow-green-400/50"
//                   style={{ animationDelay: `${i * 0.15}s` }}
//                 />
//               ))}
//             </div>

//             <p className="text-sm text-green-100/80 text-center max-w-[300px] leading-relaxed">
//               Finding the perfect alumni matches based on your skills, interests,
//               and career aspirations
//             </p>

//             {/* Progress indicator */}
//             <div className="mt-6 w-48 h-1 bg-green-900/50 rounded-full overflow-hidden">
//               <div className="h-full bg-linear-to-r from-green-400 to-emerald-400 rounded-full animate-progress" />
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Alumni Cards Container */}
//       <div
//         ref={containerRef}
//         className="flex flex-wrap gap-6 justify-center w-full h-full max-w-6xl relative z-10 py-15 overflow-scroll"
//       >
//         {alumniData.map((alumni, i) => (
//           <div
//             key={alumni.name}
//             ref={(el) => (cardsRef.current[i] = el)}
//             className="w-55 h-80 rounded-2xl bg-linear-to-br from-[#1a6b47]/95 to-[#124a33]/95 backdrop-blur-sm text-green-50 p-6 shadow-2xl flex flex-col border border-green-400/30 hover:border-green-400/60 transition-all duration-300 hover:shadow-green-500/20 cursor-pointer group relative overflow-hidden"
//           >
//             {/* Hover linear effect */}
//             <div className="absolute inset-0 bg-linear-to-br from-green-400/0 via-green-400/0 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//             <div className="relative z-10">
//               {/* Avatar with badge */}
//               <div className="relative w-20 h-20 mb-5">
//                 <div className="w-full h-full rounded-full overflow-hidden bg-linear-to-br from-green-400/40 to-green-600/40 flex items-center justify-center text-3xl border-2 border-green-400/40 group-hover:border-green-400/70 group-hover:scale-110 transition-all duration-300 shadow-lg">
//                   <img className='object-cover w-full h-full' src={alumni.profileImg} alt="user image" />
//                 </div>
//                 {/* Match badge */}
//                 <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-green-400 text-green-900 text-xs font-bold flex items-center justify-center shadow-lg border-2 border-[#1a6b47]">
//                   #{i + 1}
//                 </div>
//               </div>

//               {/* Name & Role */}
//               <h3 className="text-xl font-bold text-green-50 leading-tight mb-1">
//                 {alumni.name}
//               </h3>
//               <p className="text-sm text-green-200/70 mb-4">{alumni.role}</p>

//               {/* Divider */}
//               <div className="w-full h-px bg-linear-to-r from-transparent via-green-400/30 to-transparent mb-4" />

//               {/* Match Score */}
//               <div className="mt-auto">
//                 <div className="flex items-baseline gap-2 mb-3">
//                   <span className="text-3xl font-bold text-green-300">
//                     {alumni.match}%
//                   </span>
//                   <span className="text-sm text-green-200/60">Match Score</span>
//                 </div>

//                 {/* Match bar with linear */}
//                 <div className="w-full h-2 bg-green-900/50 rounded-full overflow-hidden shadow-inner">
//                   <div
//                     className="h-full bg-linear-to-r from-green-400 via-emerald-400 to-green-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-green-400/50"
//                     style={{
//                       width: status === "done" ? `${alumni.match}%` : "0%",
//                       transitionDelay: `${i * 0.15 + 0.8}s`,
//                     }}
//                   />
//                 </div>

//                 <p className="text-xs text-green-200/50 mt-3 flex items-center gap-1">
//                   Based on skills & interests
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default SmartCards

