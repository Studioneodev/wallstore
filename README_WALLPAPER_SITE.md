# 🎨 WALLPAPER STORE - Guia Completo de Desenvolvimento

**Status:** Inicial | **Linguagem:** Português | **Owner:** Administrador

---

## 📋 INFORMAÇÕES CRÍTICAS

### Plataformas & Ferramentas
- **Frontend/Backend:** Open Code (Antigravity)
- **LLM:** Minimax
- **IA para Gerar Imagens:** Nano Banana
- **Autenticação:** Supabase
- **Versionamento:** GitHub
- **Deploy:** Vercel (automático via commit)
- **Pagamento:** PIX (manual/integração futura)

### Restrições de Segurança & Processo
✅ **PERMITIDO:**
- Fazer commits após AUTORIZAÇÃO explícita do usuário
- Modificar código de funcionalidades aprovadas
- Criar novos componentes/features dentro do escopo

❌ **NÃO PERMITIDO:**
- Fazer commits sem permissão (SEMPRE PEDIR ANTES)
- Mexer na estrutura do projeto sem autorização
- Fazer deploy automático sem confirmação
- Tomar decisões arquiteturais sem aprovação

### Comunicação
- 🗣️ SEMPRE em português
- 📝 SEMPRE confirmar antes de estruturas grandes
- ❓ SEMPRE perguntar se há dúvida
- 🎯 SEMPRE referenciar este documento

---

## 🏗️ ARQUITETURA DO PROJETO

```
wallstore/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ChatIA.jsx          # Chat com Minimax
│   │   │   ├── ImageGenerator.jsx  # Integração Nano Banana
│   │   │   ├── WallpaperManager.jsx # CRUD wallpapers
│   │   │   └── Dashboard.jsx       # Painel principal
│   │   ├── client/
│   │   │   ├── WallpaperGallery.jsx
│   │   │   ├── WallpaperCard.jsx
│   │   │   ├── CartAndCheckout.jsx
│   │   │   └── CategoryFilter.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── shared/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── Navigation.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── supabaseClient.js       # Configuração Supabase
│   │   ├── minmaxAPI.js            # API Minimax
│   │   ├── nanobanaAPI.js          # API Nano Banana
│   │   └── wallpaperService.js     # CRUD operações
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useWallpapers.js
│   │   └── useChat.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── components/
│   ├── utils/
│   │   ├── validators.js
│   │   └── formatters.js
│   └── App.jsx
├── .env.example
├── .env.local (⚠️ NÃO COMMITAR)
├── package.json
├── vercel.json
├── supabase.config.json
└── CRONOGRAMA.md
```

---

## 📊 CRONOGRAMA DE DESENVOLVIMENTO

### ⏱️ FASE 1: FUNDAÇÃO (Semana 1)
**Objetivo:** Estrutura básica funcional

- [ ] Projeto criado no Open Code (Antigravity)
- [ ] Configuração Supabase (autenticação)
- [ ] Estrutura de pastas criada
- [ ] Home page básica (sem login ainda)
- [ ] Login/Register page
- [ ] Proteção de rotas (admin vs cliente)
- [ ] GitHub repositório conectado
- [ ] Vercel deploy configurado

**Prompt para esta fase:** `PROMPT_FASE1_SETUP`

---

### ⏱️ FASE 2: AUTENTICAÇÃO & SUPABASE (Semana 1-2)
**Objetivo:** Sistema de login funcional

- [ ] Supabase: Tabela `users` criada
- [ ] Supabase: RLS policies configuradas
- [ ] Contexto de autenticação (Context API)
- [ ] Login/Register com Supabase
- [ ] Token JWT no localStorage
- [ ] Logout funcional
- [ ] Rota protegida /admin
- [ ] Rota protegida /dashboard (cliente)

**Prompt para esta fase:** `PROMPT_FASE2_AUTH`

---

### ⏱️ FASE 3: PAINEL ADMIN - BASE (Semana 2)
**Objetivo:** Estrutura do painel admin

- [ ] Layout admin dashboard
- [ ] Menu lateral (Admin)
- [ ] Seção "Wallpapers"
- [ ] Seção "Chat IA"
- [ ] Seção "Imagens Geradas"
- [ ] Seção "Vendas/Clientes"
- [ ] Prototipo visual

**Prompt para esta fase:** `PROMPT_FASE3_ADMIN_BASE`

---

### ⏱️ FASE 4: WALLPAPER CRUD (Semana 2-3)
**Objetivo:** Gerenciar wallpapers no admin

- [ ] Tabela `wallpapers` no Supabase
- [ ] Formulário criar wallpaper
- [ ] Listar wallpapers (tabela)
- [ ] Editar wallpaper
- [ ] Deletar wallpaper
- [ ] Upload de imagem (Supabase Storage)
- [ ] Categorias (enum: landscapes, abstract, space, etc)
- [ ] Preço em BRL

**Prompt para esta fase:** `PROMPT_FASE4_WALLPAPER_CRUD`

---

### ⏱️ FASE 5: INTEGRAÇÃO MINIMAX + NANO BANANA (Semana 3)
**Objetivo:** Chat IA e geração de imagens

- [ ] Configurar credenciais Minimax no .env
- [ ] Componente ChatIA com histórico
- [ ] Integração Minimax API
- [ ] Configurar Nano Banana no .env
- [ ] Integração Nano Banana (gerar imagens)
- [ ] Botão "Gerar com IA" (admin only)
- [ ] Preview de imagem gerada
- [ ] Salvar imagem como wallpaper

**Prompt para esta fase:** `PROMPT_FASE5_IA_INTEGRATION`

---

### ⏱️ FASE 6: GALERIA DE CLIENTES (Semana 3-4)
**Objetivo:** Front-end de compra

- [ ] Galeria com grid de wallpapers
- [ ] Filtro por categoria
- [ ] Card com: imagem, nome, preço
- [ ] Botão "Comprar agora"
- [ ] Modal/página de detalhes
- [ ] Carrinho (Context API)
- [ ] Visualizar carrinho
- [ ] Checkout (preço total)

**Prompt para esta fase:** `PROMPT_FASE6_CLIENT_GALLERY`

---

### ⏱️ FASE 7: PAGAMENTO PIX (Semana 4)
**Objetivo:** Fluxo de pagamento

- [ ] Integração PIX (API ou manual)
- [ ] Gerar QR code PIX
- [ ] Tela de confirmação
- [ ] Marcar pedido como "pago"
- [ ] Registro de pedidos (tabela `orders`)
- [ ] Histórico de compras (cliente)
- [ ] Relatório de vendas (admin)

**Prompt para esta fase:** `PROMPT_FASE7_PIX_PAYMENT`

---

### ⏱️ FASE 8: POLIMENTO & DEPLOY (Semana 4-5)
**Objetivo:** Testes e go-live

- [ ] Testes funcionais completos
- [ ] Responsividade mobile
- [ ] SEO básico
- [ ] Documentação API
- [ ] GitHub final push
- [ ] Vercel deploy produção
- [ ] Monitoramento de erros
- [ ] Suporte & manutenção

**Prompt para esta fase:** `PROMPT_FASE8_POLISH`

---

## 🔐 VARIÁVEIS DE AMBIENTE (.env.local)

```
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_KEY=xxxxx

# Minimax
VITE_MINIMAX_API_KEY=xxxxx
VITE_MINIMAX_MODEL=xxxxx

# Nano Banana
VITE_NANOBANA_API_KEY=xxxxx

# Vercel
VERCEL_ENV=production
```

**⚠️ NUNCA commitar .env.local!**

---

## 🎯 COMANDOS DO GIT (PROCESSO)

### Quando terminar uma funcionalidade:

```bash
git add .
git commit -m "[FASE-X] Descrição da funcionalidade"
```

### ANTES do commit:
1. ⚠️ **SEMPRE pedir autorização ao usuário**
2. Descrever o que foi feito
3. Listar arquivos modificados
4. Perguntar: "Posso fazer commit e deploy agora?"

### RESPOSTA POSITIVA:
```bash
git push origin main
# Vercel faz deploy automático!
```

---

## 📱 ENDPOINTS API (Supabase)

### Autenticação
- `POST /auth/v1/signup` - Registrar
- `POST /auth/v1/token?grant_type=password` - Login

### Wallpapers
- `GET /rest/v1/wallpapers` - Listar todos
- `GET /rest/v1/wallpapers?category=eq.landscapes` - Filtrar
- `POST /rest/v1/wallpapers` - Criar (admin)
- `PATCH /rest/v1/wallpapers?id=eq.xxx` - Atualizar (admin)
- `DELETE /rest/v1/wallpapers?id=eq.xxx` - Deletar (admin)

### Pedidos
- `GET /rest/v1/orders?user_id=eq.xxx` - Meus pedidos
- `POST /rest/v1/orders` - Criar pedido

---

## 🔧 COMO EU (LLM) VOU OPERAR

### Antes de qualquer ação grande:
1. ✅ Revisar este README
2. ✅ Confirmar a fase atual
3. ✅ Perguntar ao usuário se pode prosseguir
4. ✅ Referenciar o prompt da fase
5. ✅ Executar com permissão

### Se algo não está claro:
1. ❓ Perguntar ao usuário
2. 📖 Revisar este documento
3. 🚫 NÃO adivinhar ou fazer suposições

### Se preciso fazer commit:
1. 📝 Listar TODOS os arquivos modificados
2. 📋 Descrever EXATAMENTE o que foi feito
3. ❓ Pedir autorização explícita
4. ✅ Só fazer push após aprovação

---

## 📞 CHECKLIST ANTES DE CADA RESPOSTA

- [ ] Li este README completo?
- [ ] Confirmei a fase atual do projeto?
- [ ] Tenho autorização para fazer o que vou fazer?
- [ ] Vou pedir permissão para commit/estrutura?
- [ ] Estou conversando em português?
- [ ] Estou sendo claro sobre o que vou fazer?

---

## 🚨 CONTATOS DE EMERGÊNCIA

Se algo der errado:
1. **Erro de deploy:** Parar tudo, informar ao usuário
2. **Conflito de código:** Descartar alterações, pedir ajuda
3. **Dúvida sobre arquitetura:** Perguntar antes de proceder
4. **Falha de integração (IA/Supabase):** Testar credenciais, informar

---

**Versão:** 1.0  
**Última atualização:** Hoje  
**Próxima revisão:** Após Fase 1 completa  
