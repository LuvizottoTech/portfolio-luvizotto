import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import anime from 'animejs'

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [activeProject, setActiveProject] = useState(0)
  const slideRef = useRef(null)

  useEffect(() => {
    if (inView) {
      anime({
        targets: '.projects-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      anime({
        targets: '.slider-container',
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: 400,
        duration: 1000,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  const nextSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.project-item')
      console.log('Next slide - Items found:', items.length)
      if (items.length > 0) {
        slideRef.current.appendChild(items[0])
        
        setTimeout(() => {
          const newFirstItem = slideRef.current.querySelector('.project-item:nth-child(1)')
          if (newFirstItem) {
            const animatedElements = newFirstItem.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3')
            animatedElements.forEach(el => {
              el.style.animation = 'none'
              el.offsetHeight
              el.style.animation = null
            })
          }
        }, 100)
      }
    }
  }

  const prevSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.project-item')
      console.log('Previous slide - Items found:', items.length)
      if (items.length > 0) {
        slideRef.current.prepend(items[items.length - 1])
        
        setTimeout(() => {
          const newFirstItem = slideRef.current.querySelector('.project-item:nth-child(1)')
          if (newFirstItem) {
            const animatedElements = newFirstItem.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3')
            animatedElements.forEach(el => {
              el.style.animation = 'none'
              el.offsetHeight
              el.style.animation = null
            })
          }
        }, 100)
      }
    }
  }

  const handleDemoClick = (demoUrl) => {
    console.log('Demo button clicked:', demoUrl)
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCodeClick = (githubUrl) => {
    console.log('Code button clicked:', githubUrl)
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const projects = [
    {
      id: 1,
      title: "E-Commerce Microservices",
      subtitle: "Plataforma Completa",
      description: "Arquitetura moderna de microserviços com processamento de pagamentos.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["Java 21", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker"],
      category: "Fullstack",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      subtitle: "Real-Time Data",
      description: "Dashboard avançado para análise de dados em tempo real.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "MongoDB"],
      category: "Frontend",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      subtitle: "Fintech Solution",
      description: "Aplicativo bancário completo.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      technologies: ["React Native", "TypeScript", "Node.js", "JWT", "Biometrics", "Redux"],
      category: "Mobile",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    },
    {
      id: 4,
      title: "AI Content Manager",
      subtitle: "Machine Learning",
      description: "Sistema inteligente de gestão de conteúdo com IA.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["Next.js", "Python", "TensorFlow", "OpenAI", "PostgreSQL"],
      category: "AI/ML",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    },
    {
      id: 5,
      title: "DevOps Monitor",
      subtitle: "Infrastructure",
      description: "Stack completo de monitoramento com métricas.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
      technologies: ["Prometheus", "Grafana", "Docker", "Kubernetes", "Terraform"],
      category: "DevOps",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    },
    {
      id: 6,
      title: "Blockchain Voting",
      subtitle: "Web3 Solution",
      description: "Sistema de votação seguro baseado em blockchain.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      category: "Blockchain",
      year: "2025",
      demoUrl: "http://localhost:3001/",
      githubUrl: "https://github.com/LuvizottoTech"
    }
  ]

  return (
    <section id="projects" className="section-padding bg-gray-300 min-h-screen overflow-hidden" ref={ref}>
      <div className="container-custom">
        
        <div className="text-center mb-8">
          <h2 className="projects-title opacity-0 text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            PROJETOS
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore meus principais projetos através desta experiência 
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
        </div>

        <div className="slider-container opacity-0 relative max-w-7xl mx-auto">
          <div className="projects-slider-wrapper bg-gray-100 shadow-2xl relative">
            
            <div ref={slideRef} className="slider-track">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-item"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="project-content-overlay absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 opacity-0 transition-opacity duration-500">
                    <div className="absolute inset-0 flex items-center">
                      <div className="text-left text-white p-4 sm:p-6 md:p-8 lg:p-12 max-w-full sm:max-w-2xl lg:max-w-3xl w-full">
                        <div className="mb-3 sm:mb-4">
                          <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                            {project.category} • {project.year}
                          </span>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 animate-fade-in leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light mb-3 sm:mb-4 animate-fade-in-delay">
                          {project.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 animate-fade-in-delay-2 line-clamp-3 sm:line-clamp-none">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm rounded-full border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 lg:left-12 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-3 z-20">
                      {project.demoUrl && (
                        <button
                          type="button"
                          onClick={() => handleDemoClick(project.demoUrl)}
                          className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl font-semibold cursor-pointer border-none outline-none transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 text-sm sm:text-base"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Ver Demo
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCodeClick(project.githubUrl)}
                        className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold cursor-pointer border border-white/20 outline-none transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 text-sm sm:text-base"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Código
                      </button>
                    </div>
                  </div>

                  <div className="project-side-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl opacity-0 transition-opacity duration-500">
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-bold text-sm mb-1">{project.title}</h4>
                      <p className="text-xs text-gray-300">{project.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="navigation-buttons">
              <button
                onClick={prevSlide}
                className="nav-button prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextSlide}
                className="nav-button next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Interessado em colaborar ou conhecer mais projetos?
          </p>
          <button
            onClick={() => handleCodeClick("https://github.com/LuvizottoTech")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Github className="w-5 h-5 mr-3" />
            <span>Ver Todos no GitHub</span>
            <ExternalLink className="w-4 h-4 ml-3" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects
