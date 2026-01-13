import React from 'react'
import { useNavigate } from 'react-router-dom';

const AboutHero = () => {
    
    const Navigate = useNavigate();

    const handleLogin = () => {
        Navigate('/login')
    };

  return (
    <section className='w-screen max-w-full h-dvh bg-secondary-color text-white-color relative overflow-x-hidden uppercase font-extrabold text-4xl'>
        <div className='flex flex-row flex-nowrap h-full max-w-6xl mx-auto '>
            <div className=' flex shrink-0 w-screen max-w-6xl h-[70dvh] mx-auto  items-center justify-center text-center'>
                <h2 className='max-w-[60%]'>
                    <span className='text-forest-green-900'>Seniors </span> ka gyaan, 
                    <span className='text-forest-green-600'> juniors </span> ka dream, Career advice and campus team. Yahan milega fun aur future ka blend 
                    <span className='text-light-yellow'> Old-school </span> friends, 
                    <span className='text-yellow'> new-school </span> trend! 
                </h2>
            </div>

            <div className='flex shrink-0 h-[70dvh] mx-auto mt-15  items-center justify-center text-center text-6xl'>
                <div className='shrink-0 ml-50 flex gap-43 mr-15'>
                    <h1>Join. Connect.</h1>
                    <div className='relative'>
                        <h1>Chat. Grow &  Reunite</h1>
                        <img className='w-[30%] absolute -top-[35%] -left-[27%] -rotate-15' src="/images/connect1.svg" alt="connect svg" />
                        <img className='w-[30%] absolute -top-[16%] -right-[27%] rotate-5' src="/images/connect2.svg" alt="connect svg" />

                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                        <h2>Bas ek log in,  aur family unite!"</h2>
                        <button onClick={handleLogin} className="w-fit bg-forest-green-900 cursor-pointer text-white-color font-bold text-xl px-14 py-3 mt-5 rounded-lg sd:px-8 sd:py-2 ">
                              Login
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        <div className='w-screen h-[15dvh] bg-forest-green-900 absolute left-1/2 bottom-[2%] -translate-x-1/2'></div>
    </section>
  )
}

export default AboutHero