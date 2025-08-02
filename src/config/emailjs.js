
export const emailjsConfig = {
  serviceID: '2424',
  templateID: 'template_5frwubv', 
  publicKey: 'Z66Mv1uQ9v7abfohg'
}


export const getEmailTemplate = (formData) => ({
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject || 'Contato do Portfolio',
  message: formData.message,
  to_email: 'felipeluvizotto08@gmail.com',
  reply_to: formData.email
})
