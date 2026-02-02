import React, { useRef } from 'react'
import DevCards from './DevCards'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'
import { headingAnimation } from '../../animations/headingCommonAnimation';


const AboutDevelopers = () => {

    const devContainerRef = useRef(null);

    useGSAP(()=>{

        headingAnimation('.dev-text', devContainerRef)
        gsap.from('.line',{
            width: 0,
            ease: 'linear',
            scrollTrigger: {
                trigger: devContainerRef.current,
                start: 'top 60%',
                end: 'top 40%',
                scrub: 2
            }
        });
        
    })

  return (
    <div ref={devContainerRef} className=' max-w-6xl h-dvh mx-auto mt-10 mb-10 flex items-center justify-center pt-20 text-theme-white'>
        <div className="flex flex-col items-center justify-center uppercase">
            <div className="w-full flex justify-center items-end gap-2 ">
                <div className='line bg-theme-white w-full h-0.5'></div>
                <div className='dev-text text-center shrink-0'>
                    <h4>Finally !!</h4>
                    <h3 className='dev-text text-5xl font-bold'>our developers</h3>
                </div>
                <div className='line bg-theme-white w-full h-0.5'></div>
            </div>
            <div className="max-w-6xl overflow-hidden">
                <div className=' w-fit flex text-center py-10 mt-7 overflow-scroll will-change: transform'>            
                    {
                        <DevCards />
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AboutDevelopers