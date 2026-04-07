# 🏢 PETMAX - ERP+CRM com Inteligência Artificial

**Status:** Em Desenvolvimento | **Linguagem:** Português | **Owner:** Administrador

---

## ✅ Deploy Automático

O projeto está configurado com CI/CD para deploy automático no Vercel.

### O que é o Petmax?
Sistema ERP+CRM completo com IA para gestão empresarial inovadora no mercado.

### Módulos do Sistema
- **ERP**: Financeiro, Empresas, Tarefas/Projetos, Relatórios
- **CRM**: Contatos, Clientes, Pipeline de Vendas, Histórico
- **IA**: Assistente virtual, Análises automatizadas, Relatórios inteligentes
- **SaaS**: Multi-empresas, Planos de assinatura, Configurações

### Plataformas & Ferramentas
- **Frontend/Backend:** Open Code (Antigravity)
- **LLM:** Minimax (IA para assistências)
- **IA para Imagens:** Nano Banana
- **Autenticação:** Supabase
- **Versionamento:** GitHub
- **Deploy:** Vercel (automático via commit)

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
petmax/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx          # Dashboard principal
│   │   │   ├── CompanyManager.jsx     # CRUD Empresas
│   │   │   ├── ContactManager.jsx     # CRM Contatos
│   │   │   ├── TaskManager.jsx         # Tarefas/Projetos
│   │   │   ├── Financeiro.jsx          # Módulo Financeiro
│   │   │   ├── Receitas.jsx            # Controle receitas
│   │   │   ├── Despesas.jsx            # Controle despesas
│   │   │   ├── PetmaxAI.jsx            # Chat com IA
│   │   │   ├── AIRelatorios.jsx        # Relatórios IA
│   │   │   ├── Planos.jsx              # Gestão de planos SaaS
│   │   │   ├── Settings.jsx            # Configurações
│   │   │   └── SalesPipeline.jsx        # Pipeline CRM
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
│   │   ├── supabaseClient.js           # Configuração Supabase
│   │   ├── minmaxAPI.js                # API Minimax
│   │   ├── nanobanaAPI.js              # API Nano Banana
│   │   ├── companyService.js           # CRUD Empresas
│   │   ├── contactService.js           # CRM Contatos
│   │   ├── taskService.js              # Tarefas
│   │   └── financeiroService.js       # Financeiro
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCompanies.js
│   │   ├── useContacts.js
│   │   └── useFinanceiro.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AppContext.jsx
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

- [x] Projeto criado no Open Code (Antigravity)
- [x] Configuração Supabase (autenticação)
- [x] Estrutura de pastas criada
- [x] Home page básica (sem login ainda)
- [x] Login/Register page
- [x] Proteção de rotas (admin vs cliente)
- [x] GitHub repositório conectado
- [x] Vercel deploy configurado

**Status:** ✅ COMPLETO

---

### ⏱️ FASE 2: AUTENTICAÇÃO & SUPABASE (Semana 1-2)
**Objetivo:** Sistema de login funcional

- [x] Supabase: Tabela `users` criada
- [x] Supabase: RLS policies configuradas
- [x] Contexto de autenticação (Context API)
- [x] Login/Register com Supabase
- [x] Token JWT no localStorage
- [x] Logout funcional
- [x] Rota protegida /admin

**Status:** ✅ COMPLETO

---

### ⏱️ FASE 3: PAINEL ADMIN - BASE (Semana 2)
**Objetivo:** Estrutura do painel admin

- [x] Layout admin dashboard
- [x] Menu lateral (Admin)
- [x] Seção "Dashboard"
- [x] Seção "Empresas"
- [x] Seção "Contatos (CRM)"
- [x] Seção "Tarefas"
- [x] Seção "Financeiro"
- [x] Seção "Petmax IA"
- [x] Prototipo visual

**Status:** ✅ COMPLETO

---

### ⏱️ FASE 4: MÓDULOS ERP+CRM (Semana 2-3)
**Objetivo:** Gerenciar empresas, contatos e tarefas

- [ ] Tabela `companies` no Supabase (Empresas)
- [ ] Tabela `contacts` no Supabase (CRM)
- [ ] Tabela `tasks` no Supabase (Tarefas)
- [ ] CRUD Empresas (create, read, update, delete)
- [ ] CRUD Contatos (CRM completo)
- [ ] CRUD Tarefas/Projetos
- [ ] Dashboard com estatísticas
- [ ] Pipeline de vendas (CRM)

**Status:** ⏳ Em progresso

---

### ⏱️ FASE 5: INTEGRAÇÃO IA (Semana 3)
**Objetivo:** Chat com IA e análises automatizadas

- [ ] Configurar credenciais Minimax no .env
- [ ] Componente PetmaxAI com histórico
- [ ] Integração Minimax API
- [ ] Assistente para dúvidas fiscais/financeiras
- [ ] Análises automatizadas
- [ ] Relatórios inteligentes
- [ ] Sugestões baseadas em dados

**Status:** ⏳ Pendente

---

### ⏱️ FASE 6: MÓDULO FINANCEIRO (Semana 3-4)
**Objetivo:** Controle financeiro completo

- [ ] Tabela `receitas` no Supabase
- [ ] Tabela `despesas` no Supabase
- [ ] Registro de receitas
- [ ] Registro de despesas
- [ ] Fluxo de caixa
- [ ] Relatórios financeiros
- [ ] Gráficos de evolução

**Status:** ⏳ Pendente

---

### ⏱️ FASE 7: SISTEMA SAAS (Semana 4)
**Objetivo:** Multi-empresas e planos

- [ ] Tabela `plans` (planos de assinatura)
- [ ] Tabela `subscriptions` (assinaturas)
- [ ] Gestão de planos (free, basic, pro)
- [ ] Limites por plano
- [ ] Configurações por empresa
- [ ] Multi-tenancy (várias empresas)

**Status:** ⏳ Pendente

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

**Status:** ⏳ Pendente

---

## 🔐 VARIÁVEIS DE AMBIENTE (.env.local)

```
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_KEY=xxxxx

# Minimax (IA)
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

### Empresas
- `GET /rest/v1/companies` - Listar todas
- `POST /rest/v1/companies` - Criar
- `PATCH /rest/v1/companies?id=eq.xxx` - Atualizar
- `DELETE /rest/v1/companies?id=eq.xxx` - Deletar

### Contatos (CRM)
- `GET /rest/v1/contacts` - Listar todos
- `POST /rest/v1/contacts` - Criar
- `PATCH /rest/v1/contacts?id=eq.xxx` - Atualizar
- `DELETE /rest/v1/contacts?id=eq.xxx` - Deletar

### Tarefas
- `GET /rest/v1/tasks` - Listar todas
- `POST /rest/v1/tasks` - Criar
- `PATCH /rest/v1/tasks?id=eq.xxx` - Atualizar
- `DELETE /rest/v1/tasks?id=eq.xxx` - Deletar

### Financeiro
- `GET /rest/v1/receitas` - Listar receitas
- `GET /rest/v1/despesas` - Listar despesas

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

## 🏆 VISÃO PETMAX

O Petmax será um sistema **robusto e inovador** no mercado de ERP+CRM com IA, oferecendo:

- **Para empresas**: Gestão completa (financeiro, tarefas, projetos)
- **Para vendas**: CRM moderno com pipeline e histórico
- **Para consultorias**: IA que ajuda em questões fiscais e financeiras
- **Para o futuro**: Modelo SaaS escalável com múltiplas empresas

**Um diferencial no mercado brasileiro!**

---

**Versão:** 2.0  
**Última atualização:** Hoje  
**Próxima revisão:** Após Fase 4 completa