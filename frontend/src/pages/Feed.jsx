import AlumniSuggestionCard from '../components/alumni/AlumniSuggestionCard';
import Profile from '../components/Feed/Profile';
import { useNavigate } from 'react-router-dom'
import { FiRefreshCw } from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";


const Feed = () => {
  const navigate = useNavigate();

  const handleRefreshAlumni =()=>{
    console.log('refresh alumni clicked')
  }

  const handleShowMoreAlumni =()=>{
    navigate('/alumni');
    console.log('show alumni clicked')
  }

  return (
    <div className='max-w-7xl h-dvh mx-auto relative flex flex-none'>
      
      <Sidebar />

      <main className=' w-full h-dvh border-l border-r text-theme-white '>
        
      </main>

      <aside className='w-100 h-dvh text-white-color flex flex-col'>
        <div className="w-[90%] h-60 mx-auto text-center py-4 px-2 m-3 rounded-xl bg-secondary-color">
          
          <Profile />

        </div>

        <div className='alumni-recommend-section w-[90%] h-full mx-auto pt-4 px-2 flex flex-col gap-2 items-center rounded-t-3xl overflow-scroll bg-secondary-color'>
          
          <AlumniSuggestionCard />

          <div className="flex items-center gap-1 m-4">
            <button onClick={handleRefreshAlumni} className="text-lg m-y-2 px-3 py-1 bg-permanent-main-color rounded-l-2xl border-r-2"><FiRefreshCw /></button>
            <button onClick={handleShowMoreAlumni} className="text-sm m-y-2 px-3 py-1 bg-permanent-main-color rounded-r-2xl border-l-2 shrink-0">Show More</button>
          </div>
          
        </div>
      </aside>
    </div>
  )
}

export default Feed