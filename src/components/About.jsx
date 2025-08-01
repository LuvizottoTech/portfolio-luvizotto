import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Code, Server, Zap, Users } from 'lucide-react'
import anime from 'animejs'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      // Animação do título
      anime({
        targets: '.about-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação do texto
      anime({
        targets: '.about-text',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 400,
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação dos cards
      anime({
        targets: '.about-card',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(200, {start: 800}),
        duration: 600,
        easing: 'easeOutBack'
      })

      // Animação dos números
      anime({
        targets: '.counter',
        innerHTML: [0, (el) => el.getAttribute('data-target')],
        duration: 2000,
        delay: 1200,
        round: 1,
        easing: 'easeOutExpo'
      })

      // Animação das partículas
      anime({
        targets: '.particle',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(50, {start: 1500}),
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      })
    }
  }, [inView])

  const handleCardHover = (index) => {
    anime({
      targets: `.card-${index} .particle`,
      scale: [1, 1.5, 1],
      rotate: '1turn',
      duration: 1000,
      easing: 'easeInOutSine'
    })

    anime({
      targets: `.card-${index} .icon-container`,
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      duration: 800,
      easing: 'easeOutBack'
    })
  }

  const highlights = [
    {
      icon: Code,
      title: "Frontend Moderno",
      description: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
      color: "from-blue-500 to-cyan-500",
      particles: 12
    },
    {
      icon: Server,
      title: "Backend Robusto", 
      description: "Java, Spring Boot, Microserviços, API REST, GraphQL",
      color: "from-green-500 to-emerald-500",
      particles: 15
    },
    {
      icon: Zap,
      title: "DevOps & Cloud",
      description: "Docker, Kubernetes, AWS, CI/CD, Terraform, Monitoring",
      color: "from-purple-500 to-pink-500",
      particles: 10
    },
    {
      icon: Users,
      title: "Metodologias Ágeis",
      description: "Scrum, Kanban, TDD, Clean Code, SOLID, DDD",
      color: "from-orange-500 to-red-500",
      particles: 8
    }
  ]

  const stats = [
    { number: 9, label: "Anos de experiência", suffix: "+" },
    { number: 15, label: "Projetos completados", suffix: "+" },
    { number: 20, label: "Tecnologias dominadas", suffix: "+" },
    { number: 100, label: "Satisfação do cliente", suffix: "%" }
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800" ref={ref}>
      <div className="container-custom">
        
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="about-title opacity-0 text-4xl md:text-5xl font-bold gradient-text mb-6">
            Sobre Mim
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto sobre */}
          <div className="space-y-6">
            <div className="about-text opacity-0">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Desenvolvedor Full Stack apaixonado por tecnologia
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Com mais de 9 anos de experiência no desenvolvimento de software, atuo na construção de soluções resilientes, 
                escaláveis e voltadas para performance, 
                utilizando tecnologias modernas e alinhadas às principais tendências do mercado.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Minha atuação abrange tanto o back-end
                 quanto o front-end moderno, 
                entregando interfaces responsivas,
                 otimizadas para SEO e com excelente experiência do usuário.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Sempre em busca de novos desafios e oportunidades para aplicar as melhores 
                práticas de desenvolvimento e contribuir para o sucesso de projetos inovadores.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="about-text opacity-0 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <span className="counter" data-target={stat.number}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards interativos */}
          <div className="grid gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`about-card card-${index} opacity-0 relative overflow-hidden group cursor-pointer`}
                  onMouseEnter={() => handleCardHover(index)}
                  style={{
                    background: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '24px'
                  }}
                >
                  {/* Partículas animadas */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(item.particles)].map((_, i) => (
                      <div
                        key={i}
                        className="particle absolute w-2 h-2 rounded-full opacity-0"
                        style={{
                          background: `linear-gradient(45deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Efeito de onda no hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10 animate-pulse`}
                      style={{ borderRadius: '20px' }}
                    />
                  </div>

                  <div className="relative z-10 flex items-start space-x-6">
                    <div className={`icon-container flex-shrink-0 w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Indicador de progresso animado */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" 
                       style={{ width: '100%' }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Citação motivacional */}
        <div className="about-text opacity-0 text-center mt-16 p-8 glass rounded-2xl">
          <blockquote className="text-xl italic text-gray-300 mb-4">
            "O código é poesia em movimento, cada linha uma estrofe que constrói 
            a sinfonia digital do futuro."
          </blockquote>
          <cite className="text-primary-400 font-semibold">— Felipe Luvizotto</cite>
        </div>
      </div>
    </section>
  )
}

export default About
