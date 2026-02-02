import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { heroAnimation } from '../../animations/heroAnimation'
import { useNavigate } from 'react-router-dom'


const Hero = () => {

    const navigate = useNavigate();
    const containerRef = useRef(null);

    const textRefs = useRef({
        we: null,
        student: null,
        with: null,
        alumni: null,
        deco1: null,
        deco2: null,
        deco3: null,
        deco4: null,
        line: null,
        infinity: null,
    });

    useGSAP(() => {
        
        return heroAnimation(textRefs)
        
        },
        { scope: containerRef }
    );

  return (
    <section ref={containerRef} className='max-w-6xl mx-auto h-dvh xl:h-[90dvh] 2xl:h-[600px] flex flex-col items-center justify-end gap-35'>
        <div className='w-fit hero lg:text-[5.5rem] md:text-[3.5rem] text-3xl gap-2 md:gap-8 relative flex items-center justify-center uppercase font-bold text-theme-white md:pl-15 pl-6'>
            <div className='student-container relative'> 
                <h2 ref={(el) => (textRefs.current.student = el)} className='student-span '>Student</h2> 
                <div ref={(el) => (textRefs.current.we = el)} className="student-addon uppercase text-[50%] absolute top-[8%] -left-[20%] leading-[92%]">
                    <span className='block'>We</span>
                    <span className='block'>let</span>
                    <span className='block'>connect</span>
                </div>
                <span ref={(el) => (textRefs.current.deco1 = el)} className="alumni-addon-img-container absolute -top-[65%] left-[7%] block w-[40%]">
                    <img className='select-none w-full' src="/images/zigzag.svg" alt="addon zigzag" />
                </span>
                <span ref={(el) => (textRefs.current.deco2 = el)} className="alumni-addon-img-container absolute -bottom-[75%] right-[7%] block w-[40%] rotate-180">
                    <img className='select-none w-full' src="/images/zigzag.svg" alt="addon zigzag" />
                </span>
            </div>

            <div className="middle-container w-[10%] relative">
               <img ref={(el) => (textRefs.current.infinity = el)}  className='select-none w-full z-10 relative' src="/images/infinity.svg" alt="infinity" />
               <div ref={(el) => (textRefs.current.line = el)}  className='absolute top-[50%] z-0 -left-[175%] w-[445%] h-0.5 rounded-full bg-theme-white'></div>
            </div>

            <div className='w-fit alumni-container relative'> 
                <h2 ref={(el) => (textRefs.current.alumni = el)} className='alumni-span'>Alumni</h2>
                <div ref={(el) => (textRefs.current.with = el)} className="alumni-addon uppercase text-[50%] absolute -top-[25%] right-[15%]">
                    <span className='block'>with</span>
                </div>
                <span ref={(el) => (textRefs.current.deco3 = el)} className="alumni-addon-img-container absolute top-[13%] -right-[10%] block w-[25%]">
                    <img className='select-none w-full' src="/images/marker.svg" alt="addon marker ribbon" />
                </span>
                <span ref={(el) => (textRefs.current.deco4 = el)} className="alumni-addon-img-container absolute -top-[60%] -right-[7%] block w-[20%]">
                    <img className='select-none w-full' src="/images/semi circle.svg" alt="addon semi-circle" />
                </span>

            </div>
        </div>

        <div className=' w-[80%] text-center pb-5 text-xl font-semibold text-theme-white uppercase flex flex-col items-end'>
            <h3 className='tag-text'>“Learn from those who were once in your place”</h3>

            <div className='tag-text w-fit px-5 font-Urbanist mt-2 rounded-full'>
                <button onClick={()=>{navigate('/register')}} className=' border-2 px-2 py-1 rounded-l-full rounded-br-full cursor-pointer mr-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-colors duration-300 hover:bg-secondary-color hover:border-secondary-color hover:scale-105 active:scale-95'>
                    Get Started
                </button>
                <button onClick={()=>{navigate('/alumni')}} className='tag-text border-2 px-2 py-1 rounded-r-full rounded-bl-full cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-colors duration-300 hover:bg-forest-green-600 hover:border-forest-green-600 hover:scale-105 active:scale-95'>
                    Explore Alumni
                </button>
            </div>
        </div>
    
    </section>
  )
}

export default Hero