import React from 'react'
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/felipeluvizotto",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/felipeluvizotto",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:contato@felipeluvizotto.dev",
      label: "Email"
    }
  ]

  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' }
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sobre */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Felipe Luvizotto</h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras 
              e escaláveis usando as tecnologias mais modernas do mercado.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-lg hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnologias */}
          <div>
            <h4 className="text-white font-semibold mb-4">Principais Skills</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Java & Spring Boot</li>
              <li>React & Next.js</li>
              <li>Microservices</li>
              <li>Docker & Kubernetes</li>
              <li>AWS & Cloud</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>
              © {currentYear} Felipe Luvizotto. Feito com{' '}
              <Heart className="inline w-4 h-4 text-red-500 mx-1" />
              e muito café ☕
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="p-3 glass rounded-full hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-300 group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
