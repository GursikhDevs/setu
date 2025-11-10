import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Alumni from './pages/Alumni'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alumni' element={<Alumni />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App