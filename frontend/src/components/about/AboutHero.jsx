import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoMdFlower } from "react-icons/io";
import { GiPoolTriangle } from "react-icons/gi";
import { aboutHeroAnimations } from '../../animations/aboutHeroAnimation';

const AboutHero = () => {

    const aboutRef = useRef(null);
    const splitText2Ref = useRef(null);
    const splitText1Ref = useRef(null);



    useGSAP(()=>{

        let totalWidth = 0;
        const cards = gsap.utils.toArray(".containers");
        const isLargeDisplay = window.innerWidth >= 1024;

        cards.forEach(card => {
            totalWidth += card.offsetWidth;
            // console.log("totalWidth: ",totalWidth)
        });

        return aboutHeroAnimations({
            aboutRef, 
            splitText2Ref, 
            splitText1Ref, 
            totalWidth, 
            isLargeDisplay
        })

    }, {scope: aboutRef})
    
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        e.stopPropagation();
        navigate("/login");
    }
    

  return (
    <section className='h-full w-full'>
        <div ref={aboutRef} className='horizontal-track w-screen max-w-full h-dvh bg-secondary-color text-white-color relative overflow-x-hidden uppercase font-extrabold text-3xl md:text-4xl pointer-events-auto'>
            <div className='panel flex flex-row flex-nowrap h-full max-w-6xl mx-auto '>
                <div className='containers flex shrink-0 w-screen max-w-6xl h-[70dvh] mt-15 mx-auto  items-center justify-center text-center'>
                    <h2 ref={splitText1Ref} className='max-w-[60%]'>
                        <span className='text-forest-green-900'>Seniors </span> ka gyaan, 
                        <span className='text-forest-green-600'> juniors </span> ka dream, Career advice and campus team. Yahan milega fun aur future ka blend 
                        <span className='text-light-yellow'> Old-school </span> friends, 
                        <span className='text-yellow'> new-school </span> trend! 
                    </h2>
                </div>

                <div className='containers flex shrink-0 h-[70dvh] mx-auto mt-15  items-center justify-center text-center text-4xl md:text-6xl'>
                    <div ref={splitText2Ref} className='split2 shrink-0 ml-20 md:ml-50 flex gap-25 md:gap-43 mr-15'>
                        <h1>Join. Connect.</h1>
                        <div className='relative'>
                            <h1>Chat. Grow &  Reunite</h1>
                            <img className='w-[30%] absolute pointer-events-none -top-[25%] md:-top-[35%] -left-[27%] -rotate-15' src="/images/connect1.svg" alt="connect svg" />
                            <img className='w-[30%] absolute pointer-events-none -top-[16%] -right-[27%] rotate-5' src="/images/connect2.svg" alt="connect svg" />

                        </div>
                        <h2>Bas ek log in,  </h2>
                        <div className="flex flex-col justify-center items-center text-center relative z-50">
                            <h2 className='-ml-5 md:-ml-7'>aur family unite!"</h2>
                            <img className='w-[30%] absolute pointer-events-none -top-[18%] md:-top-[30%] -left-[33%] -rotate-185' src="/images/connect1.svg" alt="connect svg" />

                            <button onClick={handleLogin} className="glow-on-hover w-fit z-50 pointer-events-auto bg-forest-green-900 cursor-pointer text-white-color font-bold text-xl px-14 py-3 mt-5 rounded-lg sd:px-8 sd:py-2 ">
                                Login
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='w-screen h-[15dvh] flex items-center bg-forest-green-900 absolute left-1/2 bottom-[2%] -translate-x-1/2'>
                <IoMdFlower className='flower absolute -left-20 text-7xl pointer-events-none' />
                <GiPoolTriangle  className='flower absolute -left-40 text-6xl pointer-events-none' />

                <div className='filler absolute left-0 bottom-1 w-0 h-2 bg-white-color'></div>
            </div>
        </div>    
    </section>
  )
}

export default AboutHero