import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Alumni from './pages/Alumni'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import PrivateRoute from './routes/PrivateRoute'
import AboutHero from './components/about/AboutHero'
import PublicLayout from './components/layout/PublicLayout'


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
        <Route path='/feed' 
          element={ 
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } 
        />
        <Route path='/profile' 
          element={ 
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

      </Routes>
    </div>
  )
}

export default App