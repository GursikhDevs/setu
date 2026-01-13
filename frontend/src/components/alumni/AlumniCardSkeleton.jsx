import React from 'react'

const AlumniCardSkeleton = () => {
  return (
    <div className='w-full h-20 p-2 flex items-center justify-between border rounded border-theme-white/40 animate-pulse'>
      
      {/* Image placeholder */}
      <div className='w-20 h-17 bg-theme-white/20 rounded-sm' />

      {/* Text placeholders */}
      <div className='w-full flex flex-col gap-2 px-4'>
        <div className='w-40 h-4 bg-theme-white/20 rounded' />
        <div className='w-28 h-3 bg-theme-white/20 rounded' />
      </div>

      {/* Button + stars */}
      <div className='flex flex-col items-center gap-2'>
        <div className='w-32 h-6 bg-theme-white/20 rounded-xl' />
        <div className='w-20 h-3 bg-theme-white/20 rounded' />
      </div>
    </div>
  )
}

export default AlumniCardSkeleton
