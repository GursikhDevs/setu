import React from 'react'
import DevCards from './DevCards'

const AboutDevelopers = () => {
  return (
    <div className='max-w-6xl h-dvh mx-auto flex items-center justify-center pt-20 text-theme-white'>
        <div className="flex flex-col items-center justify-center uppercase">
            <div className='text-center'>
                <h4>Finally !!</h4>
                <h3 className='text-5xl font-bold'>our developers</h3>
            </div>
            <div className="max-w-6xl">
                <div className='flex text-center py-10 mt-7 overflow-hidden'>
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