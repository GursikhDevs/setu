import React from 'react'

const AlumniProfile = ({alumni}) => {

  const handleAskForMentorship =()=>{
    console.log('handleAskForMentorship')
  }
  const handleSendMessage =()=>{
    console.log('handleSendMessage')
  }
  
  return (
    <div className='w-full h-full p-6 flex flex-cols overflow-y-auto bg-secondary-color'>        
      <div className='flex items-center gap-20 w-full h-40'>
        <div className='w-30 h-30 relative shrink-0'>
          <img className=' w-full h-full object-cover rounded-2xl' src={alumni.profileImage} alt={alumni.username} />
          <h3 className=' uppercase font-bold text-2xl shrink-0 leading-4.5 absolute bottom-0 left-[75%] text-white'>{alumni.fullName}</h3>
        </div>
        
        <div className=' min-w-[50%] px-2 space-y-1'>
          <h3 className='text-2xl font-semibold'>{alumni.username}</h3>
          <div className='text-sm leading-3.5'>
            <h4 >{alumni.currentRole}</h4>

             {/* show only if company exists */}
            {alumni.company && (
              <h4 className='italic'>
                 at {alumni.company} 
              </h4>
            )}

            <div className=' flex flex-wrap gap-1 py-3'>
              <button onClick={handleAskForMentorship} className='shrink-0 uppercase text-xs font-semibold bg-amber-200 py-1 px-2 rounded-2xl '>Ask for mentorship</button>
              <button onClick={handleSendMessage}  className='shrink-0 uppercase text-xs font-semibold bg-amber-200 py-1 px-3 rounded-2xl '>send Message</button>
            </div>
          </div>
        </div>
      </div>

      <div>

      </div>
        
    </div>
  )
}

export default AlumniProfile