import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building, ExternalLink, Code, Zap, Award, TrendingUp } from 'lucide-react'
import anime from 'animejs'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  
  const titleRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    if (inView) {
      // Animação futurística do título com efeitos de typing
      anime({
        targets: '.experience-title-char',
        opacity: [0, 1],
        translateY: [50, 0],
        rotateY: [90, 0],
        scale: [0.3, 1],
        delay: anime.stagger(50),
        duration: 600,
        easing: 'easeOutBack(1.7)'
      })

      // Partículas flutuantes de fundo
      anime({
        targets: '.floating-particle',
        translateY: [0, -20],
        translateX: [-10, 10],
        scale: [0.8, 1.2],
        opacity: [0.3, 0.7],
        delay: anime.stagger(100),
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      })

      // Linha do tempo com efeito de escaneamento
      anime({
        targets: '.timeline-line',
        scaleY: [0, 1],
        delay: 800,
        duration: 1500,
        easing: 'easeOutExpo',
        complete: () => {
          // Efeito de pulso na linha
          anime({
            targets: '.timeline-pulse',
            scale: [1, 1.5],
            opacity: [1, 0],
            duration: 2000,
            delay: anime.stagger(400),
            direction: 'alternate',
            loop: true,
            easing: 'easeOutQuart'
          })
        }
      })

      // Cards com entrada holográfica
      anime({
        targets: '.experience-item',
        opacity: [0, 1],
        translateX: (el, i) => i % 2 === 0 ? [-100, 0] : [100, 0],
        rotateY: [45, 0],
        scale: [0.8, 1],
        delay: anime.stagger(300, {start: 1200}),
        duration: 1000,
        easing: 'easeOutBack(1.7)'
      })

      // Efeito de matriz digital no fundo
      setTimeout(() => {
        anime({
          targets: '.matrix-char',
          opacity: [0, 1, 0],
          translateY: [0, 100],
          delay: anime.stagger(50),
          duration: 2000,
          loop: true,
          easing: 'linear'
        })
      }, 2000)

      // Animação dos ícones de tecnologia
      anime({
        targets: '.tech-icon',
        scale: [0, 1],
        rotate: [180, 0],
        delay: anime.stagger(100, {start: 2000}),
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      })
    }
  }, [inView])

  // Função para criar o efeito de typing no título
  const splitTitle = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="experience-title-char inline-block opacity-0">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  // Gerar partículas de fundo
  const generateParticles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="floating-particle absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`
        }}
      />
    ))
  }

  // Gerar caracteres da matriz
  const generateMatrixChars = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'
    return Array.from({ length: 50 }, (_, i) => (
      <span
        key={i}
        className="matrix-char absolute text-primary-500/20 font-mono text-xs opacity-0 pointer-events-none select-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        {chars[Math.floor(Math.random() * chars.length)]}
      </span>
    ))
  }

  const experiences = [
    {
      title: "Consultor Sistemas SRE",
      company: "Telefonica Vivo",
      period: "2025 - Presente",
      location: "Curitiba, PR",
      type: "Full-time",
      icon: <TrendingUp className="w-5 h-5" />,
      description: [
        "🚀 Liderança técnica de equipe multidisciplinar",
        "⚡ Arquitetura e implementação de microserviços usando Java e Spring Boot",
        "🔧 Modernização de sistemas legados para novas arquiteturas",
        "🐳 Implementação de práticas DevOps e CI/CD com Docker e Kubernetes",
        "🎯 Mentoria técnica e code review para garantir qualidade do código"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "Oracle SQL", "Angular"],
      achievements: "95% uptime alcançado"
    },
    {
      title: "Analista JR",
      company: "Intelly IT",
      period: "2015 - 2018",
      location: "Curitiba, PR",
      type: "Full-time",
      icon: <Code className="w-5 h-5" />,
      description: [
        "💻 Desenvolvimento de aplicações web modernas",
        "⚙️ Automação de todos os processos manuais",
        "🔄 Desenvolvimento em sustentação",
      ],
      technologies: ["Java", "Python", "Oracle SQL"],
      achievements: "80% redução em tempo de processos"
    },
  ]

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden" ref={ref}>
      {/* Partículas flutuantes de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        {generateParticles()}
      </div>
      
      {/* Efeito matriz digital */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {generateMatrixChars()}
      </div>

      {/* Grid tecnológico de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(183, 171, 152, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(183, 171, 152, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Título da seção com efeitos futurísticos */}
        <div className="text-center mb-20 relative">
          <h2 
            ref={titleRef}
            className="experience-title text-4xl md:text-6xl font-bold mb-6"
            style={{
              color: '#f7f3f2',
              fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
              letterSpacing: '0.05em',
              fontWeight: '700'
            }}
          >
            {splitTitle('Experiência Profissional')}
          </h2>
          
          <div className="relative">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              <span className="text-primary-400 font-semibold">Jornada de inovação</span> e 
              <span className="text-accent-400 font-semibold"> excelência técnica</span> em 
              desenvolvimento de soluções de alta performance
            </p>
            
            {/* Linha decorativa animada */}
            <div className="flex justify-center items-center space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary-500"></div>
              <div className="w-4 h-4 bg-primary-500 rotate-45 animate-pulse"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500"></div>
              <div className="w-4 h-4 bg-accent-500 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-accent-500"></div>
            </div>
          </div>
        </div>

        {/* Timeline futurística */}
        <div className="relative">
          {/* Linha principal da timeline com efeitos */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-0.5">
            {/* Linha base */}
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-primary-500 via-accent-500 to-secondary-500 origin-top scale-y-0 rounded-full"></div>
            
            {/* Efeitos de pulso */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="timeline-pulse absolute w-4 h-4 bg-primary-500/50 rounded-full -left-1.5 animate-pulse"
                style={{
                  top: `${25 + i * 25}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`experience-item opacity-0 relative flex items-center group ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Ponto da timeline com efeitos holográficos */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 z-20">
                  <div className="relative">
                    {/* Núcleo principal */}
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full border-4 border-dark-900 shadow-2xl group-hover:scale-125 transition-all duration-500">
                      <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Anéis de energia */}
                    <div className="absolute inset-0 w-8 h-8 border-2 border-primary-400/50 rounded-full animate-spin"></div>
                    <div className="absolute -inset-2 w-12 h-12 border border-accent-400/30 rounded-full animate-ping"></div>
                    
                    {/* Ícone da experiência */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      {exp.icon}
                    </div>
                  </div>
                </div>

                {/* Card de experiência futurístico */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <div className="relative group">
                    {/* Efeitos de borda holográfica */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-accent-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                    <div className="absolute inset-0 border border-primary-500/30 rounded-2xl group-hover:border-primary-400/60 transition-all duration-500"></div>
                    
                    {/* Card principal */}
                    <div className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 group-hover:border-primary-500/50 transition-all duration-500 shadow-2xl">
                      
                      {/* Header do card com efeitos */}
                      <div className="mb-6 relative">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-500 mb-2">
                              {exp.title}
                            </h3>
                            
                            {/* Badge de status com efeito neon */}
                            <div className="inline-flex items-center space-x-2">
                              <span className="tech-icon px-3 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 rounded-full border border-primary-500/50 text-sm font-semibold">
                                {exp.type}
                              </span>
                              {exp.achievements && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 rounded-full border border-green-500/50 text-sm">
                                  <Award className="w-3 h-3 inline mr-1" />
                                  {exp.achievements}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Informações da empresa */}
                        <div className="flex items-center text-primary-400 font-semibold mb-4 text-lg">
                          <Building className="w-5 h-5 mr-3 text-accent-400" />
                          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                            {exp.company}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                          <div className="flex items-center group-hover:text-primary-400 transition-colors duration-300">
                            <Calendar className="w-4 h-4 mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center group-hover:text-accent-400 transition-colors duration-300">
                            <MapPin className="w-4 h-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Descrição com efeitos de hover */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                          Principais Conquistas
                        </h4>
                        <ul className="space-y-3">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-gray-300 flex items-start group-hover:text-gray-200 transition-colors duration-300">
                              <span className="text-primary-500 mr-3 mt-1 text-lg">▶</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tecnologias com efeitos interativos */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                          <Code className="w-5 h-5 mr-2 text-blue-400" />
                          Stack Tecnológico
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {exp.technologies.map((tech, i) => (
                            <span 
                              key={i} 
                              className="tech-icon px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-300 rounded-full border border-primary-500/30 text-sm font-medium hover:border-primary-400/60 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-accent-500/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Efeito de brilho ao hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-action futurístico */}
        <div className="text-center mt-20 relative">
          <div className="inline-block relative">
            <button className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25 border border-primary-500/50">
              <span className="relative z-10 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Baixar Currículo Completo
                <TrendingUp className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              
              {/* Efeito de ondas */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/50 to-accent-400/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
