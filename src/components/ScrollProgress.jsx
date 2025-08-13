import React, { useState, useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Debounce para melhor performance
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const currentProgress = (window.scrollY / totalHeight) * 100
        setProgress(Math.min(100, Math.max(0, currentProgress)))
      }, 10) // Delay menor para responsividade visual
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ScrollProgress
