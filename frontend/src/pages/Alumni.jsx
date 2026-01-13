import React, { useEffect, useState } from 'react'
import AlumniCard from '../components/alumni/AlumniCard';
import { fetchRandomAlumni } from '../api/alumniAPI'
import AlumniCardSkeleton from '../components/alumni/AlumniCardSkeleton';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetchRandomAlumni()
      .then(data => {
        console.log(data);
        
        setAlumniList(data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className='w-screen max-w-6xl mx-auto px-10 pt-25 text-theme-white relative flex flex-col items-start'>
      
      <div className='uppercase font-bold text-4xl'>
        <h3>our</h3>
        <h3>alumni</h3>
      </div>

      <div className='w-full mx-auto mt-10 flex flex-col items-center uppercase gap-3'>

        {/* Loading state */}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <AlumniCardSkeleton key={i} />
          ))
        }

        {/* Error state */}
        {error && !loading && (
          <p className='text-theme-white'>Something went wrong</p>
        )}

        {/*No data */}
        {!loading && !error && alumniList.length === 0 && (
          <p className='opacity-70'>No alumni found</p>
        )}

        {/*Data */}
        {!loading && !error && alumniList.map(alumni => (
          <AlumniCard key={alumni._id} alumni={alumni} />
        ))}

      </div>
    </section>
  )
}

export default Alumni




















// import React from 'react'
// import { FaRegStar } from "react-icons/fa";

// const Alumni = () => {
//   return (
//     <section className='w-screen max-w-6xl mx-auto px-10 pt-25 text-theme-white relative flex flex-col items-start'>
//       <div className='uppercase font-bold text-4xl'>
//         <h3>our</h3>
//         <h3>alumni</h3>
//       </div>

//       <div className='w-full mx-auto mt-10 flex flex-col items-center uppercase gap-3'>
//         <div className='w-full h-20  p-2 flex items-center justify-between border rounded border-theme-white '>
//           <div className='alumni-clip-path w-20 h-17 border-t-3 border-l-3 border-r-3 border-amber-50'>
//             {/* image */}
//             <img className='object-cover w-full h-full' src="/images/vi.jpg" alt="" />
//           </div>

//           <div className=' w-full flex flex-col gap-1 px-4'>
//             <div className='border-b-2 border-theme-white'>
//               <h4 className=''>Vishal verma</h4>
//             </div>
//             <div className='leading-4 w-fit'>
//               <h4>
//                 frontend developer
//               </h4>
//               <h5 className='lowercase italic pl-1'>
//                 at codeblooded
//               </h5>
//             </div>
//           </div>

//           <div className=''>
//             <button className='capitalize leading-4 bg-secondary-color py-1 px-3 rounded-xl'>
//               open to mentorship
//             </button>
//             <div className='flex justify-center pt-1'>
//               <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
//             </div>
//           </div>
//         </div>
        
//       </div>

//     </section> 
//   )
// }

// export default Alumni