import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Analyze from '../components/home/Analyze'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='bg-black h-screen'>
      <Navbar />
      <Hero />
      <Analyze /> 
      <Footer />
    </div>
  )
}

export default Home