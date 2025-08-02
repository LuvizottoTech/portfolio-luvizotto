# 📧 Configuração de Email - Portfolio Felipe Luvizotto

## ⚡ CONFIGURAÇÃO URGENTE PARA RECEBER EMAILS

### Status Atual
✅ EmailJS instalado no projeto
✅ Código preparado para envio real
⏳ **FALTA**: Configurar credenciais do EmailJS

## 🚀 Passos para Configuração (10 minutos)

### 1. Criar Conta EmailJS (GRATUITO)
1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"**
3. Crie conta gratuita (200 emails/mês)

### 2. Configurar Gmail
1. No dashboard EmailJS, vá em **"Email Services"**
2. Clique **"Add New Service"**
3. Escolha **"Gmail"**
4. Conecte: **felipeluvizotto08@gmail.com**
5. Copie o **Service ID** (ex: service_abc123)

### 3. Criar Template
1. Vá em **"Email Templates"**
2. **"Create New Template"**
3. Cole este template:

```
Subject: {{subject}}

🎯 NOVO CONTATO DO PORTFOLIO!

👤 Nome: {{from_name}}
📧 Email: {{from_email}}

💬 Mensagem:
{{message}}

---
� Enviado via formulário do portfolio
🔗 Responder para: {{reply_to}}
```

4. Copie o **Template ID** (ex: template_xyz456)

### 4. Obter Public Key
1. **"Account"** → **"General"**
2. Copie a **Public Key** (ex: user_def789)

### 5. CONFIGURAR NO CÓDIGO

Edite `src/components/Contact.jsx` nas linhas 78-80:

```javascript
// SUBSTITUA ESTAS LINHAS:
const serviceID = 'SEU_SERVICE_ID_AQUI'      // Cole aqui
const templateID = 'SEU_TEMPLATE_ID_AQUI'    // Cole aqui  
const publicKey = 'SUA_PUBLIC_KEY_AQUI'      // Cole aqui
```

### 6. Testar
1. Salve o arquivo
2. Acesse o portfolio
3. Envie mensagem de teste
4. ✅ **Email chegará no seu Gmail!**

## 🎯 Resultado Final

Após configuração:
- Emails chegam **DIRETAMENTE** no seu Gmail
- **Instantâneo** (segundos)
- **Formatação profissional**
- **200 emails/mês GRÁTIS**
- Backup automático (mailto)

## 🔧 Configuração Alternativa

Se não conseguir configurar EmailJS agora, o sistema já usa **mailto** como backup que abre o cliente de email do usuário.

---

**⏰ Tempo: 10 minutos | 💰 Custo: GRATUITO | 📈 Resultado: 100% funcional**
