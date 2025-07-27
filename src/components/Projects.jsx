import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Play, Filter } from 'lucide-react'
import anime from 'animejs'

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    if (inView) {
      // Animação do título
      anime({
        targets: '.projects-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação dos filtros
      anime({
        targets: '.filter-btn',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(100, {start: 400}),
        duration: 600,
        easing: 'easeOutBack'
      })

      // Animação dos projetos
      anime({
        targets: '.project-card',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(150, {start: 800}),
        duration: 600,
        easing: 'easeOutBack'
      })
    }
  }, [inView])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Microservices Platform",
      description: "Plataforma completa de e-commerce com arquitetura de microserviços, processamento de pagamentos, gestão de estoque e analytics em tempo real.",
      image: "/api/placeholder/400/250",
      technologies: ["Java 21", "Spring Boot 3", "React", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      category: "fullstack",
      featured: true,
      demoUrl: "https://demo.ecommerce-platform.com",
      githubUrl: "https://github.com/felipeluvizotto/ecommerce-microservices",
      highlights: [
        "Arquitetura hexagonal com DDD",
        "Event-driven com Apache Kafka",
        "Cache distribuído com Redis",
        "CI/CD automatizado"
      ]
    },
    {
      id: 2,
      title: "Real-Time Analytics Dashboard",
      description: "Dashboard de analytics em tempo real para análise de dados de vendas, usuários e performance com visualizações interativas.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "MongoDB", "Grafana"],
      category: "frontend",
      featured: true,
      demoUrl: "https://analytics-dashboard.demo.com",
      githubUrl: "https://github.com/felipeluvizotto/analytics-dashboard",
      highlights: [
        "Visualizações em tempo real",
        "Performance otimizada",
        "Interface responsiva",
        "Temas customizáveis"
      ]
    },
    {
      id: 3,
      title: "Process Automation Engine",
      description: "Sistema de automação de processos empresariais com workflow engine, integração com APIs externas e monitoramento.",
      image: "/api/placeholder/400/250",
      technologies: ["Java", "Spring Boot", "Camunda", "REST API", "PostgreSQL", "Docker"],
      category: "backend",
      featured: false,
      demoUrl: null,
      githubUrl: "https://github.com/felipeluvizotto/process-automation",
      highlights: [
        "Workflow engine robusto",
        "Integrações via REST/SOAP",
        "Monitoramento avançado",
        "Escalabilidade horizontal"
      ]
    },
    {
      id: 4,
      title: "Mobile Banking App",
      description: "Aplicativo mobile de banking com autenticação biométrica, transferências, investimentos e gestão financeira pessoal.",
      image: "/api/placeholder/400/250",
      technologies: ["React Native", "TypeScript", "Node.js", "JWT", "Biometrics", "Redux"],
      category: "mobile",
      featured: false,
      demoUrl: "https://banking-app.demo.com",
      githubUrl: "https://github.com/felipeluvizotto/mobile-banking",
      highlights: [
        "Autenticação biométrica",
        "Interface intuitiva",
        "Segurança avançada",
        "Offline-first"
      ]
    },
    {
      id: 5,
      title: "AI-Powered Content Manager",
      description: "Sistema de gestão de conteúdo com IA para categorização automática, sugestões de tags e otimização SEO.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Python", "TensorFlow", "OpenAI API", "PostgreSQL", "Elasticsearch"],
      category: "fullstack",
      featured: false,
      demoUrl: "https://ai-cms.demo.com",
      githubUrl: "https://github.com/felipeluvizotto/ai-content-manager",
      highlights: [
        "IA para categorização",
        "Otimização SEO automática",
        "Interface moderna",
        "API RESTful completa"
      ]
    },
    {
      id: 6,
      title: "DevOps Monitoring Stack",
      description: "Stack completo de monitoramento com métricas, logs, alertas e dashboards para aplicações em produção.",
      image: "/api/placeholder/400/250",
      technologies: ["Prometheus", "Grafana", "ELK Stack", "Docker", "Kubernetes", "Terraform"],
      category: "devops",
      featured: false,
      demoUrl: null,
      githubUrl: "https://github.com/felipeluvizotto/monitoring-stack",
      highlights: [
        "Métricas customizadas",
        "Alertas inteligentes",
        "Dashboards interativos",
        "Auto-scaling"
      ]
    }
  ]

  const filters = [
    { key: 'all', label: 'Todos os Projetos' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'devops', label: 'DevOps' }
  ]

  useEffect(() => {
    const filtered = activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter)
    setFilteredProjects(filtered)
  }, [activeFilter])

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey)
    
    // Animação ao trocar filtro
    anime({
      targets: '.project-card',
      opacity: [1, 0],
      scale: [1, 0.8],
      duration: 300,
      easing: 'easeInExpo',
      complete: () => {
        setTimeout(() => {
          anime({
            targets: '.project-card',
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(100),
            duration: 400,
            easing: 'easeOutBack'
          })
        }, 100)
      }
    })
  }

  return (
    <section id="projects" className="section-padding bg-dark-900" ref={ref}>
      <div className="container-custom">
        
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="projects-title opacity-0 text-4xl md:text-5xl font-bold gradient-text mb-6">
            Projetos em Destaque
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Seleção dos meus melhores trabalhos que demonstram expertise técnica e inovação
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6"></div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center text-gray-400 mr-4">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm">Filtrar por:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`filter-btn opacity-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-primary-500/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card opacity-0 group ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="card h-full flex flex-col hover:border-primary-500/50 overflow-hidden">
                
                {/* Imagem do projeto */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 mb-6 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Preview em breve</p>
                    </div>
                  </div>
                  
                  {/* Overlay com ações */}
                  <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Conteúdo do projeto */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs px-2 py-1 bg-accent-500/20 text-accent-400 rounded-full border border-accent-500/30">
                        Destaque
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <span className="text-primary-500 mr-2 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mais projetos */}
        <div className="text-center mt-16">
          <div className="project-card opacity-0">
            <p className="text-gray-400 mb-6">
              Interessado em ver mais projetos?
            </p>
            <a
              href="https://github.com/felipeluvizotto"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <Github className="w-5 h-5 mr-2" />
              <span>Ver todos no GitHub</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
