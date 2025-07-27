import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <Router>
      <div className="App relative overflow-x-hidden">
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
