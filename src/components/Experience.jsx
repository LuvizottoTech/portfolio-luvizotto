import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react'
import anime from 'animejs'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      // Animação do título
      anime({
        targets: '.experience-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação dos items de experiência
      anime({
        targets: '.experience-item',
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: anime.stagger(200, {start: 400}),
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação da linha do tempo
      anime({
        targets: '.timeline-line',
        scaleY: [0, 1],
        delay: 800,
        duration: 1000,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  const experiences = [
    {
      title: "Tech Lead & Arquiteto de Soluções",
      company: "Inovação Tech Solutions",
      period: "2023 - Presente",
      location: "São Paulo, SP",
      type: "Full-time",
      description: [
        "Liderança técnica de equipe de 8 desenvolvedores em projetos de grande escala",
        "Arquitetura e implementação de microserviços usando Java 21 e Spring Boot 3",
        "Modernização de sistemas legados para arquitetura hexagonal",
        "Implementação de práticas DevOps e CI/CD com Docker e Kubernetes",
        "Mentoria técnica e code review para garantir qualidade do código"
      ],
      technologies: ["Java 21", "Spring Boot 3", "Microservices", "Docker", "Kubernetes", "AWS", "PostgreSQL"]
    },
    {
      title: "Desenvolvedor Full Stack Sênior",
      company: "StartupTech Ventures",
      period: "2021 - 2023",
      location: "Remote",
      type: "Full-time",
      description: [
        "Desenvolvimento de aplicações web modernas com React e Next.js",
        "Criação de APIs REST e GraphQL altamente performáticas",
        "Implementação de arquitetura event-driven com Apache Kafka",
        "Otimização de performance resultando em 40% de melhoria no loading",
        "Colaboração direta com product owners e designers UX/UI"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "MongoDB", "Redis"]
    },
    {
      title: "Desenvolvedor Backend Java",
      company: "Enterprise Solutions Corp",
      period: "2019 - 2021",
      location: "São Paulo, SP",
      type: "Full-time",
      description: [
        "Desenvolvimento de sistemas corporativos com Spring Framework",
        "Integração com sistemas legados e APIs de terceiros",
        "Implementação de testes unitários e de integração",
        "Participação ativa em cerimônias ágeis (Scrum)",
        "Documentação técnica e treinamento de novos desenvolvedores"
      ],
      technologies: ["Java", "Spring Boot", "JPA", "MySQL", "JUnit", "Maven", "Git"]
    },
    {
      title: "Desenvolvedor Junior Full Stack",
      company: "Digital Innovations Lab",
      period: "2018 - 2019",
      location: "São Paulo, SP",
      type: "Full-time",
      description: [
        "Desenvolvimento de features para aplicações web existentes",
        "Correção de bugs e melhorias de performance",
        "Aprendizado de boas práticas de desenvolvimento",
        "Participação em projetos de automação de processos",
        "Suporte técnico e manutenção de sistemas"
      ],
      technologies: ["JavaScript", "Java", "Spring", "MySQL", "HTML", "CSS", "Bootstrap"]
    }
  ]

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900" ref={ref}>
      <div className="container-custom">
        
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="experience-title opacity-0 text-4xl md:text-5xl font-bold gradient-text mb-6">
            Experiência Profissional
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trajetória sólida de crescimento e evolução técnica
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical da timeline */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 transform md:-translate-x-0.5 origin-top"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`experience-item opacity-0 relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Ponto na timeline */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transform md:-translate-x-1/2 border-4 border-dark-900 shadow-lg"></div>

                {/* Card de experiência */}
                <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="card group hover:border-primary-500/50">
                    
                    {/* Header do card */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">
                          {exp.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-primary-400 font-semibold mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        {exp.company}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-300 flex items-start">
                          <span className="text-primary-500 mr-2 mt-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA para CV */}
        <div className="text-center mt-16">
          <div className="experience-item opacity-0 inline-block">
            <button className="btn-primary group">
              <span className="mr-2">Download CV Completo</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
