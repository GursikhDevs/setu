import React from 'react'

const MiniHero = () => {
    const studentCount = 2400;
    const alumniCount = 1000;

  return (
    <section className='max-w-6xl h-dvh mx-auto pt-10  flex flex-col gap-10 items-center justify-center text-center text-theme-white'>
        <div className='uppercase flex flex-col justify-center items-center'>
            <h3 className='text-sm'>Welcome to setu !!</h3>
            <h2 className='w-[90%] text-4xl font-bold'>Your Story's next chapter starts with a connection,</h2>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] grid-rows-1 w-full h-80 gap-4 relative bg-secondary-color border-t border-b border-theme-white">
            <div className=" flex flex-col justify-center items-end p-4 ">
                <div className='capitalize  text-center'>
                    <h3 className='text-4xl font-bold'>{studentCount}+</h3>
                    <h3 className='text-2xl font-semibold -mt-2'>Alumni</h3>
                </div>
            </div>
            <div className=" flex justify-center items-center">
                <img className='h-full object-cover' src="./images/group.svg" alt="" />
            </div>
            <div className=" flex flex-col justify-center items-start p-4 ">
                <div className='capitalize text-center'>
                    <h3 className='text-4xl font-bold'>{alumniCount}+</h3>
                    <h3 className='text-2xl font-semibold -mt-2'>Students</h3>
                </div>
            </div>

            <div className="mini-hero-clip-path bg-main-color absolute left-0 top-0 w-full h-full"></div>
        </div>
    </section>
  )
}

export default MiniHero