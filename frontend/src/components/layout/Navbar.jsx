import React, { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {useNavigate, Link} from 'react-router-dom'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react"

export default function Navbar() {
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick =()=>{
    navigate('/login');
    toggleMenu();
  }

  useGSAP(()=>{
    gsap.from(".nav-anim",{
      y: -60,
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power"
    })
  })
  useGSAP(() =>{
    if (isOpen) {
      gsap.from(".link-slide", {
        x: 60,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        delay: 0.15,
        ease: "power2.out",
      });
    } 
  },
    { dependencies: [isOpen], scope: mobileMenuRef }
  )

  return (
    <header className='flex justify-center font-Urbanist'>
      <nav className="shadow-md fixed bg-main-color z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="nav-anim">
                <img className='w-[20%] ' src="/images/setu-logo2.svg" alt="setu logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="text-theme-white hidden md:flex items-center space-x-8">
              <Link to="/" className='nav-anim hover:text-secondary-color px-3 py-2 text-base font-medium transition-colors'>Home</Link>
              <Link to="/about" className='nav-anim hover:text-secondary-color px-3 py-2 text-base font-medium transition-colors'>About</Link>
              <Link to="/alumni" className='nav-anim hover:text-secondary-color px-3 py-2 text-base font-medium transition-colors'>Alumni</Link>
              <button 
                onClick={handleLoginClick}
                className="nav-anim bg-secondary-color text-white-color px-6 py-2 rounded-xl text-base font-medium transition-colors hover:scale-105 active:scale-95"
              >
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden nav-anim">
              <button
                onClick={toggleMenu}
                className="text-white-color hover:text-secondary-color focus:outline-none rounded-md p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Right Side Sliding Menu */}
      <div 
        ref={mobileMenuRef}
        className={` fixed top-0 right-0 h-full w-64 bg-secondary-color shadow-8xl transform transition-transform duration-300 ease-in-out z-50 md:hidden 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-between items-center p-4 border-gray-200">
            <span className="text-xl font-bold text-secondary-color">Menu</span>
            <button
              onClick={toggleMenu}
              className="text-white-color hover:text-secondary-color focus:outline-none p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col p-4 space-y-2 border-none">
            <Link
              to="/"
              className="link-slide text-white-color hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="link-slide text-white-color hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/alumni"
              className="link-slide text-white-color hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              Alumni
            </Link>
            <button 
              onClick={handleLoginClick}
              className="link-slide bg-permanent-main-color text-white-color hover:bg-white-color hover:text-permanent-main-color px-4 py-3 rounded-md text-base font-medium text-center transition-colors mt-4 hover:scale-105 active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}