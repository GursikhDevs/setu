import React from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'

const Landing = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  )
}

export default Landing