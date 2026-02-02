import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'

const PrivateLayout = () => {
  return (
    
    <div className="flex w-full h-dvh">
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default PrivateLayout