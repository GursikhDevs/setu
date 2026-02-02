import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin";
import { headingAnimation } from '../../animations/headingCommonAnimation';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const MiniHero = () => {

    //!fetch and assign the student and alumni count from the api
    
    const studentCount = 2400;
    const alumniCount = 1000;

    const miniHeroContainerRef = useRef(null);
    const isLargeDisplay = window.innerWidth >= 1024;

    useGSAP(()=>{
        const tl = gsap.timeline();

        tl.add(
            headingAnimation('.mini-hero-text', miniHeroContainerRef)
        )
        .to(".mini-hero",{
            skewY: isLargeDisplay ? 40 : 55,
            ease: "ease.inOut",
            scrollTrigger: {
                trigger: miniHeroContainerRef.current,
                start: "top 30%",
                end: "top 0% ",
                scrub: 2,
                // markers: true,
            }
        }) 
        .to('.count1', {
            ease: "ease.out",
            scrambleText: {
                text: `${alumniCount}+`,
                chars: '0123456789',
                
            },
            scrollTrigger: {
                trigger: miniHeroContainerRef.current,
                start:"top 30%",
                end: "top 0% ",
                scrub: 3,
                toggleActions: "play none none none"
                // markers: true,
            }
            
        })
        .to('.count2', {
            ease: 'ease.out',
            scrambleText: {
                text: `${studentCount}+`,
                chars: '0123456789',   
            },
            scrollTrigger: {
                trigger: miniHeroContainerRef.current,
                start: "top 30%",
                end: "top 0% ",
                scrub: 3,
                toggleActions: "play none none none"
                // markers: true,
            }
        },">>")
        
    })

  return (
    <section ref={miniHeroContainerRef} className='max-w-6xl h-dvh mx-auto pt-10  flex flex-col gap-10 items-center justify-center text-center text-theme-white'>
        <div className='uppercase flex flex-col justify-center items-center'>
            <h3 className='mini-hero-text text-sm'>Welcome to setu !!</h3>
            <h2 className='mini-hero-text w-[90%] text-4xl font-bold'>Your Story's next chapter starts with a connection,</h2>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] grid-rows-1 w-full h-80 gap-4 relative overflow-hidden bg-secondary-color ">
            <div className=" flex flex-col justify-center items-end p-4 ">
                <div className='capitalize  text-center'>
                    <h3 className='count1 text-4xl font-bold'>Active</h3>
                    <h3 className='text-2xl font-semibold -mt-2'>Alumni</h3>
                </div>
            </div>
            <div className=" flex justify-center items-center">
                <img className='max-w-full max-h-full object-cover' src="./images/group.svg" alt="" />
            </div>
            <div className=" flex flex-col justify-center items-start p-4 ">
                <div className='capitalize text-center'>
                    <h3 className='count2 text-4xl font-bold'>Active</h3>
                    <h3 className='text-2xl font-semibold -mt-2'>Students</h3>
                </div>
            </div>

            <div className="mini-hero mini-hero-clip-path bg-main-color absolute left-0 top-0 w-full h-full"></div>
        </div>
    </section>
  )
}

export default MiniHero