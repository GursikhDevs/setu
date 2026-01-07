import React from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import About from './About'

const Landing = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
      </main>

      <Footer />
    </>
  )
}

export default Landing