import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [activeCategory, setActiveCategory] = useState('frontend')

  useEffect(() => {
    if (inView) {
      // Animação do título
      anime({
        targets: '.skills-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação das categorias
      anime({
        targets: '.category-btn',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(100, {start: 400}),
        duration: 600,
        easing: 'easeOutBack'
      })

      // Animação das skills
      anime({
        targets: '.skill-item',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, {start: 800}),
        duration: 600,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  useEffect(() => {
    // Animação ao trocar categoria
    anime({
      targets: '.skill-item',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(50),
      duration: 400,
      easing: 'easeOutBack'
    })
  }, [activeCategory])

  const skillCategories = {
    frontend: {
      title: "Frontend & UI/UX",
      skills: [
        { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
        { name: "Next.js 14", level: 90, color: "from-gray-700 to-gray-900" },
        { name: "TypeScript", level: 100, color: "from-blue-600 to-blue-800" },
        { name: "Tailwind CSS", level: 92, color: "from-teal-400 to-teal-600" },
        { name: "Framer Motion", level: 85, color: "from-purple-500 to-pink-500" },
        { name: "Three.js", level: 75, color: "from-yellow-400 to-orange-500" },
        { name: "Vue.js 3", level: 50, color: "from-green-400 to-green-600" },
        { name: "Vite", level: 88, color: "from-purple-600 to-blue-600" }
      ]
    },
    backend: {
      title: "Backend & Arquitetura",
      skills: [
        { name: "Java 21+", level: 100, color: "from-red-500 to-orange-500" },
        { name: "Spring Boot", level: 100, color: "from-green-500 to-green-700" },
        { name: "Microservices", level: 100, color: "from-blue-500 to-blue-700" },
        { name: "Quarkus", level: 80, color: "from-purple-500 to-purple-700" },
        { name: "Event Driven", level: 85, color: "from-yellow-500 to-orange-500" },
        { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
        { name: "GraphQL", level: 70, color: "from-pink-500 to-purple-500" },
        { name: "Apache Kafka", level: 80, color: "from-gray-600 to-gray-800" }
      ]
    },
    database: {
      title: "Database & Cache",
      skills: [
        { name: "PostgreSQL", level: 100, color: "from-blue-600 to-blue-800" },
        { name: "MongoDB", level: 80, color: "from-green-500 to-green-700" },
        { name: "Redis", level: 80, color: "from-red-500 to-red-700" },
        { name: "Elasticsearch", level: 100, color: "from-yellow-500 to-yellow-700" },
        { name: "MySQL", level: 100, color: "from-blue-400 to-blue-600" },
        { name: "Oracle", level: 100, color: "from-red-600 to-red-800" },
        { name: "Neo4j", level: 70, color: "from-green-400 to-green-600" },
        { name: "InfluxDB", level: 60, color: "from-purple-500 to-purple-700" }
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 100, color: "from-blue-500 to-blue-700" },
        { name: "Kubernetes", level: 100, color: "from-blue-600 to-purple-600" },
        { name: "AWS", level: 90, color: "from-orange-400 to-orange-600" },
        { name: "Terraform", level: 100, color: "from-purple-500 to-purple-700" },
        { name: "GitLab CI/CD", level: 90, color: "from-orange-500 to-red-500" },
        { name: "Jenkins", level: 100, color: "from-blue-400 to-blue-600" },
        { name: "Grafana", level: 100, color: "from-orange-400 to-orange-600" }
      ]
    },
    mobile: {
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 90, color: "from-blue-400 to-cyan-400" },
        { name: "Swift", level: 70, color: "from-orange-500 to-red-500" },
        { name: "SwiftUI", level: 70, color: "from-blue-500 to-purple-500" },
        { name: "Kotlin", level: 100, color: "from-purple-600 to-pink-600" },
        { name: "Flutter", level: 100, color: "from-blue-400 to-teal-400" },
        { name: "Expo", level: 90, color: "from-indigo-500 to-purple-500" },
        { name: "iOS Development", level: 70, color: "from-gray-600 to-gray-800" },
        { name: "Android Development", level: 80, color: "from-green-500 to-green-700" }
      ]
    }
  }

  return (
    <section id="skills" className="section-padding bg-dark-900" ref={ref}>
      <div className="container-custom">
        
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="skills-title opacity-0 text-4xl md:text-5xl font-bold gradient-text mb-6">
            Habilidades Técnicas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Domínio completo das tecnologias mais modernas e relevantes do mercado
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6"></div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`category-btn opacity-0 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-primary-500/10'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-item opacity-0 card group hover:border-primary-500/50"
            >
              <div className="space-y-4">
                {/* Nome da skill */}
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold group-hover:text-primary-400 transition-colors duration-300">
                    {skill.name}
                  </h4>
                  <span className="text-primary-400 font-bold text-sm">
                    {skill.level}%
                  </span>
                </div>

                {/* Barra de progresso */}
                <div className="relative">
                  <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: inView ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                  
                  {/* Efeito de brilho */}
                  <div 
                    className="absolute top-0 h-2 w-6 bg-white/30 rounded-full blur-sm transition-all duration-1000"
                    style={{ 
                      left: inView ? `${skill.level - 6}%` : '-10%',
                      transitionDelay: `${index * 100 + 500}ms`
                    }}
                  ></div>
                </div>

                {/* Indicador de nível */}
                <div className="text-xs text-gray-500">
                  {skill.level >= 90 ? 'Expert' : 
                   skill.level >= 80 ? 'Avançado' : 
                   skill.level >= 70 ? 'Intermediário' : 'Básico'}
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  )
}

export default Skills
