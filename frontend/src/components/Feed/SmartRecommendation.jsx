import React from 'react'
import { IoStarSharp } from "react-icons/io5";
import { useMemo } from "react";
import SmartCards from './smartRecommendation/SmartCards';

const SmartRecommendation = () => {

  //can change star count if needed
  const STAR_COUNT = 50;

  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      top: Math.random() * 100,   // %
      left: Math.random() * 100,  // %
      size: Math.random() * 12 + 8, // px
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className='bg-linear-to-br from-[#051a0f] via-[#0b2f1d] to-[#0a1f14] w-full h-100dvh relative z-10'>
      
      <div className='w-full h-full relative uppercase bg-transparent z-10 flex flex-col items-center text-center text-white '>
        
        <div className='w-full h-[20%] flex flex-col justify-end items-center '>
          <h4 className='text-sm font-Urbanist'>Smart Recommendation !!</h4>
          <h3 className=' font-semibold text-4xl'>We got you match</h3>
        </div>

        <div className='w-full h-[80%]'>
          <SmartCards />
        </div>

      </div>

      {/* background stars */}
      <div className='w-full h-full absolute top-0 left-0  z-9 pointer-none select-none overflow-hidden'>
          {stars.map((star) => (
            <IoStarSharp
              key={star.id}
              className="absolute text-white glitter-star"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                fontSize: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
      </div>
    </div>
  )
}

export default SmartRecommendation