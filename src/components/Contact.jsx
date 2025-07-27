import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react'
import anime from 'animejs'

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    if (inView) {
      // Animação do título
      anime({
        targets: '.contact-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })

      // Animação dos cards de contato
      anime({
        targets: '.contact-card',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150, {start: 400}),
        duration: 600,
        easing: 'easeOutExpo'
      })

      // Animação do formulário
      anime({
        targets: '.form-group',
        opacity: [0, 1],
        translateX: [30, 0],
        delay: anime.stagger(100, {start: 800}),
        duration: 600,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulação de envio (substitua pela sua lógica real)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Animação de sucesso
      anime({
        targets: '.success-message',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        easing: 'easeOutBack'
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 5000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@felipeluvizotto.dev",
      href: "mailto:contato@felipeluvizotto.dev",
      description: "Resposta em até 24h"
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      href: "tel:+5511999999999",
      description: "WhatsApp disponível"
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "São Paulo, SP",
      href: "https://maps.google.com/?q=São+Paulo+SP",
      description: "Disponível para remote"
    },
    {
      icon: MessageCircle,
      title: "LinkedIn",
      value: "linkedin.com/in/felipeluvizotto",
      href: "https://linkedin.com/in/felipeluvizotto",
      description: "Vamos nos conectar!"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/felipeluvizotto",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/felipeluvizotto",
      color: "hover:text-blue-400"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/felipeluvizotto",
      color: "hover:text-blue-400"
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800" ref={ref}>
      <div className="container-custom">
        
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="contact-title opacity-0 text-4xl md:text-5xl font-bold gradient-text mb-6">
            Vamos Trabalhar Juntos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pronto para transformar suas ideias em realidade? Entre em contato e vamos discutir seu próximo projeto.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Informações de contato */}
          <div className="space-y-8">
            <div className="contact-card opacity-0">
              <h3 className="text-2xl font-bold text-white mb-6">Entre em Contato</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Estou sempre aberto a discutir novas oportunidades, projetos interessantes 
                ou simplesmente trocar ideias sobre tecnologia. Não hesite em me contatar!
              </p>
            </div>

            {/* Cards de contato */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="contact-card opacity-0 glass rounded-xl p-6 group hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-primary-400 font-medium mb-1">
                          {info.value}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Links sociais */}
            <div className="contact-card opacity-0 glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Me siga nas redes:</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="glass rounded-2xl p-8">
            <h3 className="form-group opacity-0 text-2xl font-bold text-white mb-6">
              Envie uma Mensagem
            </h3>

            {submitStatus === 'success' && (
              <div className="success-message opacity-0 bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6">
                ✓ Mensagem enviada com sucesso! Entrarei em contato em breve.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">
                ✗ Erro ao enviar mensagem. Tente novamente.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="form-group opacity-0">
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-300"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email */}
              <div className="form-group opacity-0">
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-300"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Assunto */}
              <div className="form-group opacity-0">
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Assunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-300"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="freelance">Projeto Freelance</option>
                  <option value="job">Oportunidade de Emprego</option>
                  <option value="consulting">Consultoria</option>
                  <option value="partnership">Parceria</option>
                  <option value="other">Outros</option>
                </select>
              </div>

              {/* Mensagem */}
              <div className="form-group opacity-0">
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-300 resize-none"
                  placeholder="Conte-me sobre seu projeto ou ideia..."
                />
              </div>

              {/* Botão de envio */}
              <div className="form-group opacity-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Enviar Mensagem
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
