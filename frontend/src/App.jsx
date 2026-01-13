//OM namah sivay
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Alumni from './pages/Alumni';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';  // ✅ Add this import
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/alumni' element={<Alumni />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* Private routes */}
        <Route 
          path='/feed' 
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path='/profile' 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        
        {/* ✅ Messages Route */}
        <Route 
          path='/messages' 
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;