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
    }
  }, [inView])

  const highlights = [
    {
      icon: Code,
      title: "Frontend Moderno",
      description: "React 18, Next.js 14, TypeScript, Tailwind CSS, Framer Motion"
    },
    {
      icon: Server,
      title: "Backend Robusto",
      description: "Java 21, Spring Boot 3, Microserviços, API REST, GraphQL"
    },
    {
      icon: Zap,
      title: "DevOps & Cloud",
      description: "Docker, Kubernetes, AWS, CI/CD, Terraform, Monitoring"
    },
    {
      icon: Users,
      title: "Metodologias Ágeis",
      description: "Scrum, Kanban, TDD, Clean Code, SOLID, DDD"
    }
  ]

  const stats = [
    { number: 5, label: "Anos de experiência", suffix: "+" },
    { number: 50, label: "Projetos completados", suffix: "+" },
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
                Com mais de 5 anos de experiência, sou especializado em criar soluções 
                escaláveis e performáticas utilizando as tecnologias mais modernas do mercado.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Minha expertise se concentra em <span className="text-primary-400 font-semibold">
                arquitetura hexagonal</span>, <span className="text-primary-400 font-semibold">
                microserviços com Java/Spring Boot</span> e desenvolvimento front-end moderno 
                com <span className="text-primary-400 font-semibold">React e Next.js</span>.
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

          {/* Cards de destaque */}
          <div className="grid gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="about-card opacity-0 card group hover:border-primary-500/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
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
