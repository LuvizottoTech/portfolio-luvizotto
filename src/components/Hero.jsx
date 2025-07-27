import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download, Github, Linkedin, Mail, MousePointer } from 'lucide-react'
import anime from 'animejs'
import ThreeBackground from './ThreeBackground'
import './audio-effects.css'

const Hero = () => {
  // ===== STATE E REFS =====
  const heroRef = useRef(null)
  const [mouseEffect, setMouseEffect] = useState({ x: 0, y: 0 })
  const [showScrollHint, setShowScrollHint] = useState(true)
  
  // Refs para controle de áudio
  const audioContextRef = useRef(null)
  const windSoundRef = useRef(null)
  const keyboardAudioRef = useRef(null)

  // ===== CONFIGURAÇÕES =====
  const WIND_DELAY = 2000
  const TYPEWRITER_DELAY = 3000
  const WIND_VOLUME = 0.03
  const TYPING_VOLUME = 0.03

  // ===== FUNÇÕES DE ÁUDIO =====
  const createWindSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const audioContext = audioContextRef.current
      const bufferSize = audioContext.sampleRate * 2
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      
      // Gerar ruído branco
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }
      
      const whiteNoise = audioContext.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true
      
      // Configurar filtro e gain
      const filter = audioContext.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 300
      filter.Q.value = 1
      
      const gainNode = audioContext.createGain()
      gainNode.gain.value = WIND_VOLUME
      
      // Conectar cadeia de áudio
      whiteNoise.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      whiteNoise.start()
      windSoundRef.current = whiteNoise
      
      console.log('Som de vento iniciado')
    } catch (error) {
      console.log('Erro ao criar som de vento:', error)
    }
  }

  const stopWindSound = () => {
    if (windSoundRef.current) {
      try {
        windSoundRef.current.stop()
        windSoundRef.current = null
        console.log('Som de vento parado')
      } catch (error) {
        console.log('Erro ao parar som de vento:', error)
      }
    }
  }

  const playTypingSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const audioContext = audioContextRef.current
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      // Configurar som de tecla com frequência variável
      oscillator.type = 'square'
      oscillator.frequency.value = 10 + Math.random() * 280
      
      // Envelope ADSR para som natural
      const now = audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(TYPING_VOLUME, now + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.start(now)
      oscillator.stop(now + 0.08)
      
    } catch (error) {
      console.log('Erro ao reproduzir som de digitação:', error)
    }
  }

  // ===== DADOS DE CONFIGURAÇÃO =====
  const technologies = [
    { text: "Java", color: "#ff6b6b" },
    { text: " | ", color: "#ffffff" },
    { text: "Spring Boot", color: "#4ecdc4" },
    { text: " | ", color: "#ffffff" },
    { text: "React", color: "#45b7d1" },
    { text: " | ", color: "#ffffff" },
    { text: "Node.js", color: "#96ceb4" },
    { text: " | ", color: "#ffffff" },
    { text: "Microservices", color: "#feca57" },
    { text: " | ", color: "#ffffff" },
    { text: "Docker", color: "#ff9ff3" },
    { text: " | ", color: "#ffffff" },
    { text: "Kotlin", color: "#D8334A" },
    { text: " | ", color: "#ffffff" },
    { text: "Mongo", color: "#008000" },
    { text: " | ", color: "#ffffff" },
    { text: "Swift", color: "#85685dff" },
  ]

  // ===== FUNÇÕES DE ANIMAÇÃO =====
  const initializeAnimations = () => {
    anime({
      targets: '.hero-title span',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(100, {start: 500}),
      duration: 1000,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: 1500,
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-description',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: 2000,
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-button',
      opacity: [0, 1],
      scale: [1.2, 1],
      delay: anime.stagger(200, {start: 2500}),
      duration: 600,
      easing: 'easeOutBack'
    })

    anime({
      targets: '.hero-avatar',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: 1000,
      duration: 1000,
      easing: 'easeOutBack'
    })

    anime({
      targets: '.hero-avatar',
      translateY: [-10, 10],
      duration: 3000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    })
  }

  const initializeTypewriter = () => {
    let techIndex = 0
    let charIndex = 0
    
    const typewriter = () => {
      const typewriterElement = document.querySelector('.typewriter')
      if (!typewriterElement) return
      
      if (techIndex < technologies.length) {
        const currentTech = technologies[techIndex]
        if (charIndex < currentTech.text.length) {
          const currentChar = currentTech.text[charIndex]
          
          if (currentChar !== ' ' && currentChar !== '|') {
            playTypingSound()
          }
          
          let html = ""
          for (let i = 0; i <= techIndex; i++) {
            const tech = technologies[i]
            if (i < techIndex) {
              html += `<span style="color: ${tech.color}">${tech.text}</span>`
            } else {
              html += `<span style="color: ${tech.color}">${tech.text.slice(0, charIndex + 1)}</span>`
            }
          }
          
          html += '<span class="cursor" style="color: #4ecdc4">|</span>'
          typewriterElement.innerHTML = html
          
          charIndex++
          const delay = currentChar === ' ' ? 50 : (Math.random() * 50 + 80)
          setTimeout(typewriter, delay)
        } else {
          techIndex++
          charIndex = 0
          setTimeout(typewriter, 300)
        }
      }
    }
    
    setTimeout(typewriter, TYPEWRITER_DELAY)
  }

  // ===== HANDLERS =====
  const handleScroll = () => {
    const heroSection = document.getElementById('home')
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect()
      const isHeroVisible = rect.bottom > 0 && rect.top < window.innerHeight
      
      if (!isHeroVisible && windSoundRef.current) {
        stopWindSound()
      } else if (isHeroVisible && !windSoundRef.current) {
        createWindSound()
      }
    }
  }

  // ===== EFFECT PRINCIPAL =====

  useEffect(() => {
    // Inicializar som de vento
    const windTimer = setTimeout(createWindSound, WIND_DELAY)

    // Configurar scroll listener
    window.addEventListener('scroll', handleScroll)

    // Inicializar todas as animações
    initializeAnimations()
    
    // Inicializar efeito typewriter
    initializeTypewriter()

    // Cleanup
    return () => {
      clearTimeout(windTimer)
      window.removeEventListener('scroll', handleScroll)
      stopWindSound()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // ===== OUTRAS FUNÇÕES =====
  const scrollToAbout = () => {
    // Smooth scroll with anime.js
    anime({
      targets: 'html, body',
      scrollTop: document.querySelector('#about')?.offsetTop || 0,
      duration: 1000,
      easing: 'easeInOutCubic'
    })
  }

  const handleMouseMove = (mouse) => {
    setMouseEffect(mouse)
    
    // Interactive text effects
    anime({
      targets: '.hero-title span',
      rotateY: mouse.x * 5,
      rotateX: mouse.y * 5,
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  const handleTransition = (direction) => {
    if (direction === 'next') {
      setShowScrollHint(false)
      scrollToAbout()
    }
  }

  return (
    <>
      {/* Three.js Background */}
      <ThreeBackground onMouseMove={handleMouseMove} onTransition={handleTransition} />
      
      <section id="home" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
        {/* Interactive overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mouseEffect.x + 1) * 50}% ${(1 - mouseEffect.y) * 50}%, rgba(255,255,255,0.03) 0%, transparent 50%)`
          }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Conteúdo Principal */}
          <div className="text-center lg:text-left">
            
            {/* Saudação */}
            <div className="hero-subtitle opacity-0 mb-4">
              <span className="text-primary-400 font-mono text-lg">Olá, eu sou</span>
            </div>

            {/* Nome */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight mb-6">
              {'Felipe'.split('').map((char, index) => (
                <span key={index} className="inline-block" style={{color: '#f6f4f2'}}>
                  {char}
                </span>
              ))}
              <br />
              {'Luvizotto'.split('').map((char, index) => (
                <span key={index + 6} className="inline-block" style={{color: '#f6f4f2'}}>
                  {char}
                </span>
              ))}
            </h1>

            {/* Subtítulo profissional */}
            <div className="hero-subtitle opacity-0 space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-light" style={{color: '#f6f4f2'}}>
                Desenvolvedor <span className="font-semibold" style={{color: '#f6f4f2'}}>Full Stack</span>
              </h2>
              <div className="text-lg text-primary-400 font-mono">
                <span className="typewriter"></span>
              </div>
            </div>

            {/* Ícones de Tecnologias */}
            <div className="hero-description opacity-0 max-w-2xl">
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center">
                {/* Java */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-accent-400 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Java</div>
                </div>

                {/* Spring Boot */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-green-400 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.8537 1.4158a10.4504 10.4504 0 0 1-1.284 2.2471A11.9666 11.9666 0 1 0 3.1699 20.7398a10.4504 10.4504 0 0 1 2.2471-1.284 9.9663 9.9663 0 1 1 16.4367-18.04zM9.7727 7.0198a7.9736 7.9736 0 0 1 8.2533 6.8675 7.9736 7.9736 0 0 1-6.8675 8.2533 7.9736 7.9736 0 0 1-8.2533-6.8675 7.9736 7.9736 0 0 1 6.8675-8.2533z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Spring</div>
                </div>

                {/* React */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">React</div>
                </div>

                {/* Node.js */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-green-500 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Node.js</div>
                </div>

                {/* Docker */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.938-.089 2.833-.266a11.432 11.432 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Docker</div>
                </div>

                {/* Kubernetes */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-blue-500 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.013 22.25c-1.564 0-3.044-.336-4.393-.999a10.244 10.244 0 01-3.562-2.69 10.244 10.244 0 01-2.691-3.562c-.663-1.35-.999-2.829-.999-4.393s.336-3.044.999-4.393a10.244 10.244 0 012.69-3.562A10.244 10.244 0 017.62 1.36c1.35-.663 2.829-.999 4.393-.999s3.044.336 4.393.999a10.244 10.244 0 013.562 2.691 10.244 10.244 0 012.691 3.562c.663 1.35.999 2.829.999 4.393s-.336 3.044-.999 4.393a10.244 10.244 0 01-2.69 3.562 10.244 10.244 0 01-3.562 2.691c-1.35.663-2.829.999-4.394.999zm-.013-1.5c2.761 0 5.117-1.022 7.067-3.065C20.978 16.13 22 13.773 22 10.995s-1.022-5.134-3.065-7.067C16.13 1.978 13.773.956 10.995.956S5.86 1.978 3.928 3.928C1.978 5.86.956 8.216.956 10.995s1.022 5.134 3.065 7.067C5.86 20.022 8.217 21.044 10.995 21.044z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Kubernetes</div>
                </div>

                {/* PostgreSQL */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-blue-600 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5593 14.9849c-.5627-.2134-.9266-.6433-1.0326-1.2186-.0967-.5248.0642-1.0486.4551-1.4818.7277-.8064 1.1093-1.8594 1.0738-2.9649-.0415-1.2927-.5856-2.5019-1.5311-3.4032-.9454-.9013-2.1838-1.3624-3.4826-1.2972-1.1069.0556-2.1591.5113-2.9656 1.2837-.4332.415-.9569.6019-1.4818.5278-.5753-.0815-1.0051-.4455-1.2185-1.0321-.3976-1.0923-1.1963-1.9873-2.2498-2.5225-1.0536-.5352-2.2685-.5772-3.4242-.1183-1.1556.459-2.0859 1.3141-2.6202 2.4089-.5343 1.0947-.5575 2.3523-.0656 3.5453.2633.6387.3116 1.3372.1371 1.9746-.1745.6374-.5994 1.1768-1.2013 1.5249-1.0923.6316-1.8449 1.6859-2.1201 2.9667-.2752 1.2808-.0336 2.6128.6797 3.7522.7134 1.1394 1.8152 1.9636 3.1057 2.3229.4364.1216.8937.1216 1.3301 0 .5621-.1563 1.0612-.4938 1.4152-.957.4543-.5955 1.0996-.9792 1.8262-.8742.6663.0963 1.2462.4746 1.6373 1.0686.3911.594.5504 1.3262.4503 2.0697-.0792.5877-.1275 1.1798-.1448 1.7734-.0278.9555.2749 1.8845.8507 2.612.5758.7276 1.3828 1.2137 2.2679 1.3653.8851.1516 1.7863-.0436 2.5347-.5494.7484-.5058 1.2813-1.2794 1.4992-2.1764.2179-.8969.105-1.8398-.3179-2.6543-.2134-.4122-.3418-.8686-.3759-1.3352-.0438-.599.098-1.1968.4012-1.6907.3032-.4939.7565-.8489 1.2818-.9766.9806-.2388 1.8365-.8433 2.4093-1.7014.5728-.858.8185-1.9037.6919-2.943-.1266-1.0394-.652-1.9916-1.4796-2.6809-.8275-.6894-1.8844-.9916-2.9738-.8507-.5243.0678-1.0566-.0219-1.5099-.2548-.4532-.2329-.8-.6063-.9817-1.0591l-.0014-.0047.0014.0047c-.1817-.4528-.2128-.9484-.0882-1.4058.1246-.4575.4016-.8497.7851-1.1124.7135-.4888 1.2354-1.1879 1.5011-2.0092.2657-.8213.2537-1.7047-.0345-2.5378-.2882-.8331-.8375-1.5558-1.5792-2.0763-.7418-.5204-1.627-.7952-2.5453-.789-.9183.0062-1.7981.2893-2.5307.8137-.4455.3192-.9862.4794-1.5314.4543-.5452-.0251-1.0613-.2392-1.4631-.6075-.7473-.6851-1.7089-1.0759-2.7137-1.1037-1.0048-.0278-1.9842.3094-2.7632.9522-.7789.6427-1.2929 1.5473-1.4502 2.5536-.1573 1.0062.0721 2.0317.6485 2.8935.3092.4623.4593.9995.4253 1.5224-.034.5229-.2392 1.0159-.5815 1.3981-.6369.7117-.9999 1.6075-1.0231 2.5226-.0232.9151.2947 1.816.8962 2.5408.6015.7247 1.4479 1.2348 2.3863 1.4389.7537.1639 1.5378.0567 2.2226-.3039.4455-.234.9498-.3266 1.4297-.2628.4799.0638.9225.2812 1.2541.6163.6184.6245 1.0073 1.4163 1.1293 2.3004.1219.8841-.0073 1.7848-.3749 2.6181-.3676.8333-.9462 1.5484-1.6809 2.0798-.7347.5314-1.5844.8429-2.4674.9059-.8829.063-1.7548-.0791-2.5338-.4126.7789-.3335 1.5547-.7295 2.3224-1.1875 1.0692-.6379 1.8036-1.6776 2.0714-2.9311.2678-1.2536.0439-2.5671-.6315-3.7044-.6754-1.1372-1.7525-1.9437-3.0373-2.273-.4295-.1102-.8765-.1102-1.3059 0-.5523.1419-1.0406.4644-1.3838.9141-.4401.5765-1.0661.9491-1.7721.8449-.647-.0956-1.209-.4605-1.5878-1.0328-.3787-.5722-.5319-1.2871-.4334-2.021.0785-.5808.127-1.1642.145-1.7491.029-.942-.2721-1.8614-.8419-2.5744-.5698-.7129-1.3613-1.1898-2.2171-1.3371-.8559-.1473-1.7394.0449-2.4772.5406-.7378.4957-1.269 1.2543-1.4922 2.1345-.2231.8802-.1072 1.8037.3266 2.6019.219.403.351.8491.3871 1.3049.0464.5856-.0967 1.1679-.4054 1.6478-.3087.4799-.7533.8245-1.2599.9761-.9447.2832-1.7703.8724-2.324 1.6583-.5536.7859-.7849 1.7254-.6516 2.6457.1333.9203.6246 1.7618 1.3836 2.3706.7589.6087 1.7264.9399 2.7235.9335.5178-.0034 1.0276-.1198 1.4937-.3408.4661-.2209.8698-.5359 1.183-.9228.4019-.4966.9398-.8435 1.5243-.9827.5845-.1393 1.1962-.0635 1.7332.2145.5985.3099 1.08.7873 1.3617 1.3503.2816.5629.3487 1.1797.1903 1.7466l-.0024.0085.0024-.0085c-.1584.5669-.4827 1.0701-.9181 1.4258-.8118.6624-1.4103 1.5584-1.7209 2.5747-.3106.0164-2.0734.7133-2.9279 1.4991-.9544.8786-1.5309 2.0516-1.6578 3.373-.1269 1.3214.2184 2.6244.9921 3.7458.7737 1.1214 1.9059 1.9809 3.2576 2.4721 1.3516.4912 2.8426.5788 4.2881.2522 1.4455-.3266 2.7606-1.0672 3.7825-2.1302.4896-.509.8763-1.0845 1.1481-1.709.3499-.8038.9089-1.4808 1.6261-1.9706.7171-.4897 1.5628-.7562 2.4637-.7762.9009-.0199 1.7822.2015 2.5681.6446.785.4431 1.4388 1.0889 1.9058 1.8797.4669.7908.6245 1.6969.4594 2.6395-.1235.7061-.1833 1.4254-.1788 2.1467.007 1.1601.3496 2.3034.9877 3.2939.6381.9904 1.5343 1.7807 2.5812 2.2769 1.0469.4962 2.1937.6672 3.3008.4918 1.1071-.1754 2.1222-.6816 2.9218-1.4583.7996-.7767 1.3388-1.7774 1.5536-2.8833.2147-1.1058.0888-2.2624-.3622-3.3265-.229-.5394-.3742-1.1112-.4303-1.6956-.0722-.7514.0774-1.4984.4238-2.1166.3464-.6182.8674-1.077 1.4747-1.3008 1.1322-.4177 2.0768-1.1949 2.6602-2.1896.5833-.9947.7647-2.1467.5109-3.2453-.2538-1.0986-.8954-2.0786-1.8068-2.7621-.9114-.6836-2.0371-.9993-3.1729-.8901-.546.0525-1.0939-.0476-1.5537-.2835-.4597-.2359-.8103-.6041-.9931-1.0437l-.0022-.0067.0022.0067c-.1828-.4396-.2185-.9228-.1011-1.3701.1174-.4473.3818-.8277.7499-1.0789.6855-.4677 1.1887-1.1381 1.4454-1.9261.2567-.7879.2467-1.6394-.0288-2.4464-.2755-.8069-.8045-1.4982-1.5201-1.9877-.7156-.4896-1.5687-.7512-2.4538-.7523-.885-.0011-1.739.2581-2.4561.7441z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">PostgreSQL</div>
                </div>

                {/* MongoDB */}
                <div className="group relative">
                  <svg className="w-12 h-12 text-primary-400 hover:text-green-600 transition-colors duration-300 cursor-pointer transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
                  </svg>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">MongoDB</div>
                </div>
              </div>
            </div>

            
          </div>

          {/* Avatar/Imagem */}
          <div className="flex justify-center lg:justify-end">
            <div className="hero-avatar opacity-0 relative">
              <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem]">
                {/* Círculo de fundo animado com nova paleta */}
               
            
                
                {/* Sua foto */}
                <div className="absolute inset-6 rounded-full overflow-hidden border-4 shadow-2xl"
                     style={{borderColor: 'rgba(216, 233, 232, 0.47)'}}>
                  <img
                    src="/foto.jpeg"
                    alt="Felipe Luvizotto"
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-300 hover:scale-105"
                  />
                  {/* Overlay sutil */}
                  <div className="absolute inset-0" 
                       style={{background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)'}}>
                  </div>
                </div>

                {/* Partículas orbitais */}
                {[...Array(6)].map((_, i) => {
                  // Ângulos que evitam o centro da foto (evita queixo e rosto)
                  const angles = [30, 60, 120, 150, 210, 240]; // Evita 0°, 90°, 180°, 270°
                  const angle = angles[i]
                  const radius = 140 + (i % 2) * 20
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius
                  
                  return (
                    <div
                     
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        
        </div>
      </section>
    </>
  )
}

export default Hero
