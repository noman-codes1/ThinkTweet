import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ScrollToTop = () => {

  //finding the location of the current path
  const pathname = useLocation()

  //using the effect to move the the user to top
  useEffect(() => {
    window.scrollTo({top:0, left:0, behavior:'smooth'})
  }, [pathname])
  
  return null
}

export default ScrollToTop