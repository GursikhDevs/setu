import React from 'react'

const Hero = () => {
  return (
    <section className='max-w-6xl mx-auto h-dvh xl:h-[90dvh] 2xl:h-[600px] flex items-center justify-center'>
        <div className='hero lg:text-[5.5rem] md:text-[3.5rem] text-3xl gap-2 md:gap-8 relative flex items-center justify-center uppercase font-bold text-theme-white md:pl-15 pl-6'>
            <div className='student-container relative'> 
                <h2 className='student-span'>Student</h2> 
                <div className="student-addon uppercase text-[50%] absolute top-[8%] -left-[20%] leading-[92%]">
                    <div>We</div>
                    <div>let</div>
                    <div>connect</div>
                </div>
                <span className="alumni-addon-img-container absolute -top-[65%] left-[7%] block w-[40%]">
                    <img className='select-none w-full' src="/images/zigzag.svg" alt="addon zigzag" />
                </span>
                <span className="alumni-addon-img-container absolute -bottom-[75%] right-[7%] block w-[40%] rotate-180">
                    <img className='select-none w-full' src="/images/zigzag.svg" alt="addon zigzag" />
                </span>
            </div>

            <div className="middle-container w-[10%] relative">
               <img className='select-none w-full z-10' src="/images/infinity.svg" alt="infinity" />
            </div>

            <div className='w-fit alumni-container relative'> 
                <h2 className='alumni-span'>Alumni</h2>
                <div className="alumni-addon uppercase text-[50%] absolute -top-[25%] right-[15%]">
                    <div>with</div>
                </div>
                <span className="alumni-addon-img-container absolute top-[13%] -right-[10%] block w-[25%]">
                    <img className='select-none w-full' src="/images/marker.svg" alt="addon marker ribbon" />
                </span>
                <span className="alumni-addon-img-container absolute -top-[60%] -right-[7%] block w-[20%]">
                    <img className='select-none w-full' src="/images/semi circle.svg" alt="addon semi-circle" />
                </span>

            </div>
        </div>
    
    </section>
  )
}

export default Hero