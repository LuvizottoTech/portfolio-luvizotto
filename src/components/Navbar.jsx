import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, User, Code, Briefcase, Mail, Github, Linkedin } from 'lucide-react'
import anime from 'animejs'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setScrolled(window.scrollY > 50)
      }, 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Animação inicial da navbar
    anime({
      targets: '.nav-item',
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    })
  }, [])

  const navItems = [
    { name: 'Início', href: '#home', icon: Home },
    { name: 'Sobre', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Experiência', href: '#experience', icon: Briefcase },
    { name: 'Projetos', href: '#projects', icon: Code },
    { name: 'Contato', href: '#contact', icon: Mail },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass backdrop-blur-xl py-4' : 'py-6'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="nav-item">
            <a 
              href="#home" 
              className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
            >
              FL.dev
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item text-white hover:text-primary-400 transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item text-white hover:text-primary-400 transition-colors duration-300 p-2 hover:bg-primary-500/10 rounded-lg"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item text-white hover:text-primary-400 transition-colors duration-300 p-2 hover:bg-primary-500/10 rounded-lg"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-primary-400 transition-colors duration-300 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-white hover:text-primary-400 transition-colors duration-300 p-2 rounded-lg hover:bg-primary-500/10"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </a>
                )
              })}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-400 transition-colors duration-300 p-2 hover:bg-primary-500/10 rounded-lg"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-400 transition-colors duration-300 p-2 hover:bg-primary-500/10 rounded-lg"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
