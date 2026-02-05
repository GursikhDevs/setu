import React, { useState, useRef, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import axios from "axios";
import SearchResults from './search/SearchResults';

const Search = () => {
  const [status, setStatus] = useState('empty'); // 'empty', 'searching', 'searched', 'error'
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const searchContainerRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const searchBarRef = useRef(null);
  const headingRef = useRef(null);

  // Animate search bar to top when results are shown
  useEffect(() => {
    if ((status === 'searched' && results.length > 0) || error) {
      const tl = gsap.timeline();

      tl.to(searchContainerRef.current, {
        y: '-25vh',
        duration: 0.6,
        ease: 'power3.inOut',
      })
      .to(headingRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.out',
      }, '<')
      .fromTo(
        resultsContainerRef.current?.querySelector('.grid')?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      );
    } else if (status === 'empty') {
      gsap.to(searchContainerRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [status, results, error]);

  // 🔥 Backend API call
  const fetchData = async (query) => {
    try {
      setStatus('searching');
      setError(null);

      const res = await axios.post(
        "http://localhost:3000/search/searchBar",
        { query: query.trim() },
        { withCredentials: true }
      );

      const searchResults = res.data.results || [];
console.log(res.data.results);

      setResults(searchResults);
      setStatus(searchResults.length > 0 ? 'searched' : 'searched'); // searched but empty handled below
    } catch (err) {
      console.error("Search error:", err);
      setError(err?.response?.data?.message || "Search failed");
      setStatus('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    fetchData(input);
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
    setStatus('empty');
    setError(null);
  };

  return (
    <div className='w-full h-full relative overflow-hidden flex flex-col justify-center items-center pt-10'>

      {/* Search Container */}
      <div 
        ref={searchContainerRef}
        className='w-full h-fit flex flex-col items-center justify-center relative z-10 transition-all duration-500 '
      >
        <div className='w-full flex flex-col justify-center items-center text-center '>

          <h3 
            ref={headingRef}
            className='p-2 mb-3 text-4xl font-bold text-theme-white text-shadow-lg font-Urbanist tracking-tight'
          >
            Discover Your Network
          </h3>

          <form onSubmit={handleSubmit} className='w-[90%] max-w-2xl relative group'>
            <div className='relative'>

              <div className='absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
              
              <input
                ref={searchBarRef}
                onChange={(e) => setInput(e.target.value)}
                name="search"
                value={input}
                type="text"
                placeholder="Search alumni, students, skills..."
                className="w-full h-16 relative backdrop-blur-xl border-2 border-white-500/30 text-theme-white placeholder:text-theme-white placeholder:opacity-70 outline-none focus:border-green-400/60 rounded-full px-16 text-lg transition-all duration-300 shadow-lg shadow-green-900/20 focus:shadow-green-500/20"
                disabled={status === 'searching'}
              />
              
              <BsSearch className='absolute left-6 text-2xl top-1/2 -translate-y-1/2 text-theme-white' />

              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className='absolute right-20 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center'
                >
                  <IoClose className='text-xl text-theme-white' />
                </button>
              )}

              <button
                type="submit"
                disabled={!input.trim() || status === 'searching'}
                className='absolute right-2 top-1/2 -translate-y-1/2 h-12 px-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 text-white-color font-semibold disabled:opacity-50'
              >
                {status === 'searching' ? 'Searching...' : 'Search'}
              </button>
            </div>

            <p className='text-secondary-color text-sm mt-4 text-center'>
              Try searching "skills", "batch", or "name"
            </p>
          </form>
        </div>
      </div>

      {/* Results */}
      <div ref={resultsContainerRef}>
        {status === 'searched' && results.length > 0 && (
          <SearchResults results={results} onClear={handleClear} />
        )}
      </div>

      {/* Empty */}
      {status === 'searched' && results.length === 0 && (
        <div className='h-fit text-center text-theme-white border-2 p-5 rounded-2xl'>
          <BsSearch className='text-5xl mx-auto mb-4' />
          <h3 className='text-2xl font-bold mb-2'>No results found</h3>
          <p className='opacity-80 mb-2'>Try adjusting your search terms</p>
          <button onClick={handleClear} className='px-6 py-3 rounded-full bg-green-500/20'>
            Clear Search
          </button>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className='text-center h-fit max-w-md text-theme-white border-2 p-5 rounded-2xl'>
          <h3 className='text-2xl font-bold mb-1'>Search Failed</h3>
          <p className='opacity-70'>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Search;


// import React, { useState, useRef, useEffect } from 'react'
// import { BsSearch } from "react-icons/bs";
// import { IoClose } from "react-icons/io5";
// import gsap from "gsap";
// import SearchResults from './search/SearchResults';

// const Search = () => {
//   const [status, setStatus] = useState('empty'); // 'empty', 'searching', 'searched', 'error'
//   const [input, setInput] = useState("")
//   const [results, setResults] = useState([])
//   const [error, setError] = useState(null)
  
//   const searchContainerRef = useRef(null)
//   const resultsContainerRef = useRef(null)
//   const searchBarRef = useRef(null)
//   const headingRef = useRef(null)

//   // Animate search bar to top when results are shown
//   useEffect(() => {
//     if (status === 'searched' && results.length > 0 || error) {
//       const tl = gsap.timeline();
      
//       // Move search container to top
//       tl.to(searchContainerRef.current, {
//         y: '-25vh',
//         duration: 0.6,
//         ease: 'power3.inOut',
//       })
//       // Fade out heading
//       .to(headingRef.current, {
//         opacity: 0,
//         y: -20,
//         duration: 0.4,
//         ease: 'power2.out',
//       }, '<')
//       // Show results with stagger
//       .fromTo(
//         resultsContainerRef.current?.querySelector('.grid')?.children || [],
//         {
//           opacity: 0,
//           y: 30,
//           scale: 0.95,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.5,
//           stagger: 0.08,
//           ease: 'back.out(1.2)',
//         },
//         '-=0.2'
//       );
//     } else if (status === 'empty') {
//       // Reset to center
//       gsap.to(searchContainerRef.current, {
//         y: 0,
//         duration: 0.6,
//         ease: 'power3.inOut',
//       });
//       gsap.to(headingRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         ease: 'power2.out',
//       });
//     }
//   }, [status, results, error]);

//   // Fetch data from backend
//   const fetchData = async (query) => {
//     try {
//       setStatus('searching');
//       setError(null);

//       // Get auth token
//       const token = localStorage.getItem('authToken');
      
//       const response = await fetch('YOUR_API_ENDPOINT/api/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           query: query.toLowerCase().trim(),
//           // Optional: Add search type filters if your backend supports it
//           searchTypes: ['username', 'name', 'skills', 'batch']
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       // Adjust based on your API response structure
//       const searchResults = data.results || data.users || data;
      
//       setResults(searchResults);
//       setStatus(searchResults.length > 0 ? 'searched' : 'empty');
      
//     } catch (err) {
//       console.error('Search error:', err);
//       setError(err.message);
//       setStatus('error');
//       console.log(error)
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!input.trim()) {
//       return;
//     }

//     fetchData(input);
//   };

//   const handleClear = () => {
//     setInput("");
//     setResults([]);
//     setStatus('empty');
//     setError(null);
//   };

//   return (
//     <div className='w-full h-full relative overflow-hidden flex flex-col justify-center items-center pt-10'>

//       {/* Search Container - Centered initially, moves to top on search */}
//       <div 
//         ref={searchContainerRef}
//         className='w-full h-fit flex flex-col items-center justify-center relative z-10 transition-all duration-500 '
//       >
//         <div className='w-full flex flex-col justify-center items-center text-center '>
//           {/* Heading - Fades out when searching */}
//           <h3 
//             ref={headingRef}
//             className='p-2 mb-3 text-4xl font-bold text-theme-white text-shadow-lg font-Urbanist tracking-tight'
//           >
//             Discover Your Network
//           </h3>

//           {/* Search Bar */}
//           <form 
//             onSubmit={handleSubmit} 
//             className='w-[90%] max-w-2xl relative group'
//           >
//             <div className='relative'>
//               {/* Glow effect on focus */}
//               <div className='absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300' />
              
//               <input
//                 ref={searchBarRef}
//                 onChange={(e) => setInput(e.target.value)}
//                 name="search"
//                 value={input}
//                 type="text"
//                 placeholder="Search anything..."
//                 className="w-full h-16 relative  backdrop-blur-xl border-2 border-white-500/30 text-theme-white placeholder:text-theme-white placeholder:opacity-70 outline-none focus:border-green-400/60 rounded-full px-16 text-lg transition-all duration-300 shadow-lg shadow-green-900/20 focus:shadow-green-500/20"
//                 disabled={status === 'searching'}
//               />
              
//               {/* Search Icon */}
//               <BsSearch className='absolute left-6 text-2xl top-1/2 -translate-y-1/2 text-theme-white transition-colors duration-300 group-focus-within:text-forest-green-600' />

//               {/* Clear Button */}
//               {input && (
//                 <button
//                   type="button"
//                   onClick={handleClear}
//                   className='absolute right-20 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-all duration-200 group'
//                 >
//                   <IoClose className='text-xl text-theme-white' />
//                 </button>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={!input.trim() || status === 'searching'}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 h-12 px-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 text-white-color font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95'
//               >
//                 {status === 'searching' ? (
//                   <div className='flex items-center gap-2'>
//                     <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
//                     <span>Searching...</span>
//                   </div>
//                 ) : (
//                   'Search'
//                 )}
//               </button>
//             </div>

//             {/* Search hint */}
//             <p className='text-secondary-color text-sm mt-4 text-center'>
//               Try searching for any "Skill", "Batch", or a "Person's name"
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Results Section - Using separate component */}
//       <div ref={resultsContainerRef}>
//         {status === 'searched' && results.length > 0 && (
//           <SearchResults results={results} onClear={handleClear} />
//         )}
//       </div>

//       {/* Empty State */}
//       {status === 'searched' && results.length === 0 && (
//         <div className='h-fit text-center text-theme-white border-2 p-5 rounded-2xl'>
//           <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center'>
//             <BsSearch className='text-5xl' />
//           </div>
//           <h3 className='text-2xl font-bold mb-2'>No results found</h3>
//           <p className='opacity-80 mb-2'>Try adjusting your search terms</p>
//           <button
//             onClick={handleClear}
//             className='px-6 py-3 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-300 transition-all duration-200'
//           >
//             Clear Search
//           </button>
//         </div>
//       )}

//       {/* Error State */}
//       {status === 'error' && (
//         <div className='text-center h-fit max-w-md text-theme-white border-2 p-5 rounded-2xl'>
//           <div className='w-fit h-fit mx-auto mb-2 rounded-full flex items-center justify-center'>
//             <svg className='w-12 h-12 text-red-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
//             </svg>
//           </div>
//           <h3 className='text-2xl font-bold mb-1'>User Not Found</h3>
//           <p className=' mb-2 opacity-70'>Try searching something else!!</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Search


















// // import React, { useState } from 'react'
// // import { BsSearch } from "react-icons/bs";

// // const Search = () => {
// //   const [status, setStatus] = useState('empty');
// //   const [input, setInput] = useState("")
// //   const [results, setResults] = useState([])

// //   //!dont have to filter data in the frontend, it will be filtered in the backend
// //   const fetchData =(value)=>{
// //     fetch("https://jsonplaceholder.typicode.com/users")
// //     .then((response) => response.json())
// //     .then((json)=>{
// //       const results = json.filter((user)=>{
// //         return (
// //           value && 
// //           user && 
// //           user.name && 
// //           user.name.toLowerCase().includes(value)
// //         )
// //       })
// //       setResults(results)
// //       console.log(results)
// //     })
// //   }
// //   const handleChange=(value)=>{
// //     setInput(value)
// //     fetchData(value)
// //   }
// //   const handleSubmit=(e)=>{
// //     e.preventDefault()
    
// //     setStatus("searched")
    
// //   }

// //   return (
// //     <div className='w-full h-full flex flex-col items-center justify-center'>
// //       <div className=' w-full h-[20%] flex flex-col justify-center items-center text-center text-theme-white'>
// //         <h3 className='p-2 uppercase text-2xl font-semibold'>Type for whom you are searching for</h3>

// //           <form 
// //           onSubmit={(e)=>{handleSubmit(e)}} 
// //           action="" 
// //           className='w-[60%] h-12 relative'
// //           >
// //             <input
// //               onChange={(e)=> handleChange(e.target.value)}
// //               name="search"
// //               value={input}
// //               type="text"
// //               placeholder="Search alumni or students…"
// //               className="w-full h-full my-2 border-2 text-theme-white outline-none focus:outline-none focus:ring-0 active:ring-0 rounded-full px-15 text-xl"
// //             />
// //             <BsSearch className='absolute left-5 text-2xl top-[40%]' />

// //           </form>

// //       </div>
// //       {
// //         status === "searched" && (
// //           <div className='w-full h-full pt-15 px-10'>
// //             <div className='w-full h-fit bg-amber-200 overflow-scroll'>
// //               {/* show the searched cards here */}

// //             </div>
// //           </div>
// //         )
// //       }
// //     </div>
// //   )
// // }

// // export default Search

// // //! can filter data in the basis of batch, skills or just give the flexibility of searching batch or skills in the same search bar