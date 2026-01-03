import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLink = ({ href, children, className = "" }) => (
    <a 
      href={href} 
      className={`text-white-color hover:text-secondary-color px-3 py-2 text-base font-medium transition-colors ${className}`}
    >
      {children}
    </a>
  );

  return (
    <header className='flex justify-center'>
      <nav className="shadow-md fixed bg-main-color z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="">
                <img className='w-[20%] ' src="/images/setu-logo2.svg" alt="setu logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#alumni">Alumni</NavLink>
              <a 
                href="/login" 
                className="bg-secondary-color text-white-color hover:scale-105 px-6 py-2 rounded-md text-base font-medium transition-colors"
              >
                Login
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white-color hover:text-secondary-color focus:outline-none focus:ring-2 focus:ring-secondary-color rounded-md p-2"
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
        className={`fixed top-0 right-0 h-full w-64 bg-white-color shadow-8xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="text-xl font-bold text-secondary-color">Menu</span>
            <button
              onClick={toggleMenu}
              className="text-gray-medium hover:text-secondary-color focus:outline-none p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col p-4 space-y-2">
            <a
              href="#home"
              className="text-gray-medium hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-medium hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#alumni"
              className="text-gray-medium hover:bg-blue-50 hover:text-secondary-color px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              Alumni
            </a>
            <a
              href="#login"
              className="bg-secondary-color text-white-color hover:bg-main-color px-4 py-3 rounded-md text-base font-medium text-center transition-colors mt-4"
              onClick={toggleMenu}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}