import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, Check, X, Sparkles } from 'lucide-react'
import anime from 'animejs'
import emailjs from '@emailjs/browser'
import { emailjsConfig, getEmailTemplate } from '../config/emailjs'

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isHovering, setIsHovering] = useState(null)

  useEffect(() => {
    if (inView) {
      // Animação épica do título com efeito de digitação
      anime({
        targets: '.contact-title',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.8, 1],
        duration: 1000,
        easing: 'easeOutBack'
      })

      // Partículas flutuantes ao fundo
      anime({
        targets: '.floating-particle',
        translateY: [0, -20],
        opacity: [0.3, 0.8, 0.3],
        scale: [0.8, 1.2, 0.8],
        duration: 3000,
        delay: anime.stagger(200),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      })

      // Animação dos cards com efeito holográfico
      anime({
        targets: '.contact-card',
        opacity: [0, 1],
        translateY: [50, 0],
        rotateX: [30, 0],
        delay: anime.stagger(200, {start: 400}),
        duration: 800,
        easing: 'easeOutBack'
      })

      // Animação do formulário com onda
      anime({
        targets: '.form-group',
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: anime.stagger(150, {start: 800}),
        duration: 700,
        easing: 'easeOutElastic(1, .6)'
      })

      // Efeito de brilho no botão de envio
      anime({
        targets: '.send-button',
        boxShadow: [
          '0 0 0 rgba(183, 171, 152, 0)',
          '0 0 30px rgba(183, 171, 152, 0.6)',
          '0 0 0 rgba(183, 171, 152, 0)'
        ],
        duration: 2000,
        delay: 1500,
        loop: true,
        easing: 'easeInOutSine'
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
    setSubmitStatus('')
    
    // Animação do botão durante envio
    anime({
      targets: '.send-button',
      scale: [1, 0.95, 1],
      duration: 200,
      easing: 'easeInOutQuad'
    })
    
    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Por favor, preencha todos os campos obrigatórios')
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor, insira um email válido')
      }

      // Usar configuração do arquivo emailjs.js
      const templateParams = getEmailTemplate(formData)

      // Envio real do email usando EmailJS
      const result = await emailjs.send(
        emailjsConfig.serviceID, 
        emailjsConfig.templateID, 
        templateParams, 
        emailjsConfig.publicKey
      )
      
      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Mostrar popup de sucesso com animação épica
        setShowSuccessPopup(true)
        
        // Animação de confete
        anime({
          targets: '.success-particle',
          translateY: [0, -100],
          translateX: () => anime.random(-50, 50),
          opacity: [1, 0],
          scale: [0, 1, 0],
          duration: 1500,
          delay: anime.stagger(50),
          easing: 'easeOutQuart'
        })

        // Fechar popup após 4 segundos
        setTimeout(() => {
          setShowSuccessPopup(false)
        }, 4000)
        
      } else {
        throw new Error('Falha no envio do email')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erro ao enviar mensagem:', error)
      
      // Fallback para mailto se EmailJS falhar
      const mailtoLink = `mailto:felipeluvizotto08@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contato do Portfolio')}&body=${encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 5000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "felipeluvizotto08@gmail.com",
      href: "mailto:felipeluvizotto08@gmail.com",
      description: "Resposta em até 24h"
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Curitiba, PR",
      href: "https://maps.google.com/?q=Curitiba+PR",
      description: "Disponível para remote"
    },
    {
      icon: MessageCircle,
      title: "LinkedIn",
      value: "linkedin.com/in/felipeluvizotto",
      href: "https://www.linkedin.com/in/felipe-luvizotto-4a611b114/",
      description: "Vamos nos conectar!"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/LuvizottoTech",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/felipe-luvizotto-4a611b114/",
      color: "hover:text-blue-400"
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800" ref={ref}>
      <div className="container-custom">
        
        {/* Popup de Sucesso Épico */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl border border-primary-500/30 shadow-2xl max-w-md mx-4">
              {/* Partículas de confete */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="success-particle absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              {/* Ícone de sucesso animado */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4 animate-pulse">
                  <Check className="w-10 h-10 text-white animate-bounce" />
                </div>
                <div className="flex justify-center space-x-1">
                  <Sparkles className="w-6 h-6 text-primary-400 animate-spin" />
                  <Sparkles className="w-4 h-4 text-accent-400 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-primary-400 animate-spin" style={{animationDelay: '0.5s'}} />
                </div>
              </div>
              
              {/* Mensagem de sucesso */}
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  Email Enviado com Sucesso! 🚀
                </h3>
                <p className="text-gray-300 mb-2">
                  Sua mensagem foi entregue com sucesso!
                </p>
                <p className="text-primary-400 font-medium">
                  Entraremos em contato em breve! ⚡
                </p>
              </div>
              
              {/* Botão de fechar */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Partículas flutuantes ao fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-primary-400/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
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
              <div className="success-message opacity-0 bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6 flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Mensagem enviada com sucesso!</p>
                  <p className="text-sm text-green-300">Seu cliente de email foi aberto. Respondo em até 24h!</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Erro ao enviar mensagem</p>
                  <p className="text-sm text-red-300">Por favor, envie diretamente para: <a href="mailto:felipeluvizotto08@gmail.com" className="underline hover:text-red-200">felipeluvizotto08@gmail.com</a></p>
                </div>
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
                  onFocus={() => setIsHovering('name')}
                  onBlur={() => setIsHovering(null)}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10 transform hover:scale-[1.02]"
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
                  onFocus={() => setIsHovering('email')}
                  onBlur={() => setIsHovering(null)}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10 transform hover:scale-[1.02]"
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
                  className="send-button w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onMouseEnter={() => setIsHovering('button')}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  {/* Efeito de onda ao hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {isSubmitting ? (
                    <div className="relative flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="animate-pulse">Enviando mensagem...</span>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Enviar Mensagem</span>
                      <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
