# 🚀 Como Fazer Deploy do seu Portfólio

## 📋 Opções Gratuitas de Hospedagem

### 1. **GitHub Pages** ⭐ (Já configurado)

**Pré-requisitos:**
- Projeto no GitHub
- Repository público

**Passos:**
```bash
# 1. Fazer commit das mudanças
git add .
git commit -m "Configuração para deploy"
git push origin main

# 2. Fazer o deploy
npm run deploy
```

**Seu site ficará em:** `https://LuvizottoTech.github.io/portfolio-luvizotto/`

---

### 2. **Vercel** ⭐ (Recomendado)

**Vantagens:**
- Deploy automático a cada push
- Performance excelente
- Domínio personalizado grátis

**Passos:**
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "Import Project"
4. Selecione seu repositório `portfolio-luvizotto`
5. Configure:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Clique em "Deploy"

**Resultado:** `https://portfolio-luvizotto.vercel.app`

---

### 3. **Netlify** ⭐

**Passos Simples:**
1. Acesse: https://netlify.com
2. Faça login
3. Arraste a pasta `dist/` (depois de fazer `npm run build`)
4. Ou conecte com GitHub para deploy automático

**Resultado:** `https://portfolio-luvizotto.netlify.app`

---

### 4. **Firebase Hosting**

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Fazer login
firebase login

# Inicializar projeto
firebase init hosting

# Deploy
npm run build
firebase deploy
```

---

## 🔧 Comandos Úteis

```bash
# Testar build localmente
npm run build
npm run preview

# Deploy GitHub Pages
npm run deploy

# Verificar se está tudo funcionando
npm run dev
```

## 📱 Para Testar Responsividade

1. Abra as ferramentas de desenvolvedor (F12)
2. Clique no ícone de dispositivo móvel
3. Teste em diferentes tamanhos de tela

## 🌐 Domínio Personalizado (Opcional)

**Para usar seu próprio domínio:**
1. Compre um domínio (Registro.br, GoDaddy, etc.)
2. Configure os DNS para apontar para sua hospedagem
3. No Vercel/Netlify, adicione o domínio personalizado

## 🚨 Problemas Comuns

**Erro 404 ao navegar:**
- Adicione `_redirects` file no Netlify
- Ou use HashRouter no React

**Imagens não carregam:**
- Verifique os caminhos das imagens
- Use caminhos relativos

**Build falha:**
- Execute `npm run build` localmente primeiro
- Verifique se não há erros no console

## 📞 Precisa de Ajuda?

Se tiver problemas:
1. Verifique o console do navegador
2. Teste o build local primeiro
3. Verifique se todas as dependências estão instaladas
