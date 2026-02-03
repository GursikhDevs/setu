import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Alumni from './pages/Alumni'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import UserProfile from './components/Feed/UserProfile'
import PrivateRoute from './routes/PrivateRoute'
import AboutHero from './components/about/AboutHero'
import PublicLayout from './components/layout/PublicLayout'

import SmartRecommendation from './components/Feed/SmartRecommendation'
import Search from './components/Feed/Search'
import CreatePost from './components/Feed/CreatePost'
import Messages from './components/Feed/Messages'
import ChatBot from './components/Feed/ChatBot'
import PrivateLayout from './components/layout/PrivateLayout'


const App = () => {
  return (
    <div>

      <Routes>

        {/* Public routes, Nav + Footer */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/alumni' element={<Alumni />} />
          <Route path='/about' element={<AboutHero />} />
          <Route path='/contact' element={<Contact />} />
        </Route>

        {/* public routes without nav + footer */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Private routes */}
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/feed" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="smart-recommendation" element={<SmartRecommendation />} />
            <Route path="messages" element={<Messages />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="search" element={<Search />} />
            <Route path="chat-bot" element={<ChatBot />} />
            <Route path="user-profile" element={<UserProfile />} />
          </Route>
        {/* </Route> */}


      </Routes>
    </div>
  )
}

export default App