# ✅ CHECKLIST PRÁTICO - PETMAX ERP+CRM

**Use este arquivo para acompanhar progresso e garantir qualidade**

---

## 🎯 ANTES DE COMEÇAR (TODOS OS DIAS)

### Checklist de Abertura
- [ ] Li o README_PETMAX.md completamente?
- [ ] Sei em qual fase estou?
- [ ] Tenho as credenciais necessárias? (.env)
- [ ] GitHub está atualizado? (git pull)
- [ ] Nenhum conflito de código?
- [ ] Estou usando o prompt correto da fase?

---

## 🏗️ FASE 1: SETUP INICIAL

### Tarefas
- [ ] Projeto criado no Open Code (Antigravity)
- [ ] Estrutura de pastas criada conforme README
- [ ] `package.json` com dependências básicas
- [ ] Vite configurado
- [ ] React Router instalado e configurado
- [ ] Rotas criadas (Home, Login, Register, Admin, 404)

### Componentes
- [ ] `components/shared/Header.jsx` (navegação)
- [ ] `components/shared/Footer.jsx`
- [ ] `pages/HomePage.jsx`
- [ ] `pages/LoginPage.jsx`
- [ ] `pages/RegisterPage.jsx`
- [ ] `pages/AdminPanel.jsx` (vazio por enquanto)
- [ ] `App.jsx` com rotas

### Estilo
- [ ] CSS global básico ou Tailwind setup
- [ ] Home com estilo mínimo funcional
- [ ] Header com links navegação
- [ ] Buttons com estilos

### Testes Manuais
- [ ] Home carrega sem erros
- [ ] Login page existe
- [ ] Register page existe
- [ ] Admin page existe
- [ ] 404 page funciona (rota inválida)
- [ ] Links funcionam

### Antes do Commit
- [ ] Nenhum erro no console
- [ ] Nenhum warning do Vite
- [ ] Código formatado (prettier)
- [ ] README.md faz sentido com o que foi feito
- [ ] **PEDIR AUTORIZAÇÃO ANTES DE FAZER COMMIT**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🔐 FASE 2: AUTENTICAÇÃO

### Supabase Setup
- [ ] Projeto Supabase criado
- [ ] Tabela `users` criada com campos corretos
- [ ] Chaves copiadas (.env)
- [ ] RLS policies configuradas
- [ ] Storage bucket criado (opcional agora)

### Código
- [ ] `services/supabaseClient.js` criado
- [ ] `context/AuthContext.jsx` criado
- [ ] `hooks/useAuth.js` criado
- [ ] `components/auth/ProtectedRoute.jsx` criado
- [ ] `components/auth/LoginForm.jsx` funcional
- [ ] `components/auth/RegisterForm.jsx` funcional

### Funcionalidades
- [ ] Register cria usuário no Supabase
- [ ] Login autentica com email/senha
- [ ] Token JWT salvo em localStorage
- [ ] Logout limpa token e contexto
- [ ] useAuth disponível em toda app
- [ ] Rota /admin redireciona se não admin
- [ ] Verificação is_admin funciona

### Dados Salvos
- [ ] Email do usuário
- [ ] Hash de senha (Supabase)
- [ ] Nome do usuário
- [ ] Flag is_admin (false para clientes)
- [ ] company_id (关联企业)
- [ ] created_at timestamp

### Testes Manuais
- [ ] Register novo usuário → criado ✓
- [ ] Login com email/senha → funciona ✓
- [ ] Logout → limpa tela ✓
- [ ] Acessar /admin sem ser admin → redireciona ✓
- [ ] Criar admin manualmente, acessar /admin → funciona ✓
- [ ] Refresh página → contexto mantém autenticação ✓

### Antes do Commit
- [ ] Testei tudo funcionando
- [ ] Sem erros de autenticação
- [ ] Token persiste em refresh
- [ ] RLS policies estão seguras
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🎨 FASE 3: PAINEL ADMIN - BASE

### Layout
- [ ] `components/admin/AdminLayout.jsx` criado (wrapper)
- [ ] `components/admin/AdminSidebar.jsx` criado
- [ ] `components/admin/AdminHeader.jsx` criado
- [ ] Sidebar com 6+ menu items

### Menu Items (vazios, apenas navegação)
- [ ] 📊 Dashboard
- [ ] 🏢 Empresas
- [ ] 👥 Contatos (CRM)
- [ ] 📋 Tarefas
- [ ] 💰 Financeiro
- [ ] 🤖 Petmax IA
- [ ] ⚙️ Configurações

### Estilo
- [ ] Tema profissional (cores, fontes)
- [ ] Sidebar responsiva (colapsa mobile)
- [ ] Header com nome admin + logout
- [ ] Menu items clicáveis (navegam)
- [ ] Dark/Light mode? (opcional)

### Testes Manuais
- [ ] Acessar /admin → carrega layout correto ✓
- [ ] Clicar menu items → muda conteúdo ✓
- [ ] Logout button funciona ✓
- [ ] Responsivo (mobile sidebar colapsa) ✓
- [ ] Visual é profissional

### Antes do Commit
- [ ] Layout funciona em desktop e mobile
- [ ] Sem erros console
- [ ] Menu navega corretamente
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🏢 FASE 4: MÓDULOS ERP+CRM

### Supabase
- [ ] Tabela `companies` criada com campos
- [ ] Tabela `contacts` criada com campos (CRM)
- [ ] Tabela `tasks` criada com campos
- [ ] Tabela `projects` criada com campos
- [ ] RLS policies para todas as tabelas

### Código Empresas
- [ ] `services/companyService.js` criado
- [ ] `components/admin/CompanyManager.jsx`
- [ ] `components/admin/CompanyForm.jsx`
- [ ] `components/admin/CompanyList.jsx`

### Código Contatos (CRM)
- [ ] `services/contactService.js` criado
- [ ] `components/admin/ContactManager.jsx`
- [ ] `components/admin/ContactForm.jsx`
- [ ] `components/admin/ContactList.jsx`
- [ ] `components/admin/SalesPipeline.jsx`

### Código Tarefas
- [ ] `services/taskService.js` criado
- [ ] `components/admin/TaskManager.jsx`
- [ ] `components/admin/TaskForm.jsx`
- [ ] `components/admin/TaskList.jsx`
- [ ] `components/admin/ProjectManager.jsx`

### Funcionalidades - Companies
- [ ] Criar empresa (nome, CNPJ/CPF, telefone, endereço)
- [ ] Listar empresas (tabela/cards)
- [ ] Editar empresa
- [ ] Deletar empresa (soft delete)
- [ ] Ativar/Inativar empresa

### Funcionalidades - Contatos (CRM)
- [ ] Criar contato (nome, email, telefone, empresa)
- [ ] Listar contatos (filtro por status)
- [ ] Pipeline de vendas ( Kanban )
- [ ] Editar contato
- [ ] Deletar contato
- [ ] Status: lead, cliente, inativo
- [ ] Etapas: novo, qualificado, proposta, ganho, perdido

### Funcionalidades - Tarefas
- [ ] Criar tarefa (título, descrição, prioridade, data)
- [ ] Listar tarefas (filtro por status)
- [ ] Editar tarefa
- [ ] Deletar tarefa
- [ ] Marcar como concluída
- [ ] Assignar usuário

### Dashboard
- [ ] Estatísticas de empresas
- [ ] Estatísticas de contatos
- [ ] Estatísticas de tarefas
- [ ] Contadores rápidos

### Testes Manuais
- [ ] CRUD Empresas completo ✓
- [ ] CRUD Contatos completo ✓
- [ ] Pipeline CRM funciona ✓
- [ ] CRUD Tarefas completo ✓
- [ ] Dashboard atualiza ✓

### Antes do Commit
- [ ] Todos os CRUDS funcionando
- [ ] Sem erros de banco
- [ ] Validações funcionando
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🤖 FASE 5: IA INTEGRATION

### Minimax Setup
- [ ] API key Minimax adicionada .env
- [ ] Modelo escolhido
- [ ] Documentação API estudada

### Código Minimax
- [ ] `services/petmaxAI.js` criado
- [ ] Função `sendMessage(message, context)`
- [ ] System prompt definido para ERP+CRM
- [ ] Histórico de chat em estado local
- [ ] `components/admin/PetmaxAI.jsx` criado

### Chat IA Funcionalidades
- [ ] Input para digitar mensagem
- [ ] Enviar mensagem (Enter ou botão)
- [ ] Mostrar resposta da IA
- [ ] Histórico conversas acima
- [ ] Loading spinner durante resposta
- [ ] Diferenciar mensagens (user vs IA)
- [ ] Botão limpar histórico
- [ ] Error handling

### Recursos IA
- [ ] Assistente para dúvidas fiscais
- [ ] Assistente para dúvidas financeiras
- [ ] Análises automatizadas
- [ ] Sugestões baseadas em dados
- [ ] Relatórios inteligentes

### Testes Manuais
- [ ] Chat Petmax IA responde ✓
- [ ] Histórico mostra corretamente ✓
- [ ] Error handling funciona ✓
- [ ] Sem erros API ✓

### Antes do Commit
- [ ] Chat funciona 100%
- [ ] Sistema IA funcional
- [ ] Sem erros
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 💰 FASE 6: MÓDULO FINANCEIRO

### Supabase
- [ ] Tabela `receitas` criada
- [ ] Tabela `despesas` criada
- [ ] RLS policies configuradas

### Código
- [ ] `services/financeiroService.js` criado
- [ ] `components/admin/Financeiro.jsx`
- [ ] `components/admin/Receitas.jsx`
- [ ] `components/admin/Despesas.jsx`
- [ ] `components/admin/FluxoCaixa.jsx`
- [ ] `components/admin/RelatoriosFinanceiros.jsx`

### Funcionalidades - Receitas
- [ ] Input: descrição, valor, categoria, data
- [ ] Listar receitas (filtro por período)
- [ ] Editar receita
- [ ] Deletar receita
- [ ] Marcar como recebido

### Funcionalidades - Despesas
- [ ] Input: descrição, valor, categoria, fornecedor, data
- [ ] Listar despesas (filtro por período)
- [ ] Editar despesa
- [ ] Deletar despesa
- [ ] Marcar como pago

### Funcionalidades - Fluxo de Caixa
- [ ] Saldo atual (receitas - despesas)
- [ ] Gráfico de evolução mensal
- [ ] Projeção de caixa
- [ ] Relatórios mensais

### Categorias Financeiras
- [ ] Receitas: vendas, serviços, investimentos, outros
- [ ] Despesas: operacional, marketing, jurídico, Payroll, outros

### Testes Manuais
- [ ] Registrar receita ✓
- [ ] Registrar despesa ✓
- [ ] Fluxo de caixa calcula ✓
- [ ] Relatórios funcionam ✓

### Antes do Commit
- [ ] Módulo financeiro completo
- [ ] Sem erros de cálculo
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## ☁️ FASE 7: SISTEMA SAAS

### Supabase
- [ ] Tabela `plans` criada
- [ ] Tabela `subscriptions` criada
- [ ] RLS policies configuradas

### Código
- [ ] `services/subscriptionService.js` criado
- [ ] `components/admin/Planos.jsx`
- [ ] `components/admin/Settings.jsx`
- [ ] `components/admin/MultiEmpresa.jsx`

### Funcionalidades - Planos
- [ ] Listar planos (free, basic, pro)
- [ ] Criar plano
- [ ] Editar plano
- [ ] Definir preço
- [ ] Definir limites (usuários, armazenamento, etc)

### Funcionalidades - Assinaturas
- [ ] Associar empresa a plano
- [ ] Verificar status assinatura
- [ ] Renovar assinatura
- [ ] Cancelar assinatura
- [ ] Controle de limites

### Funcionalidades - Multi-empresa
- [ ] Isolamento de dados por empresa
- [ ] Filtro por company_id
- [ ] Super admin vs admin empresa

### Configurações
- [ ] Configurações por empresa
- [ ] Upload de logo
- [ ] Dados da empresa

### Testes Manuais
- [ ] Planos funcionam ✓
- [ ] Assinaturas funcionam ✓
- [ ] Multi-empresa funciona ✓
- [ ] Isolamento de dados ✓

### Antes do Commit
- [ ] Sistema SaaS completo
- [ ] Sem falhas de segurança
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## ✨ FASE 8: POLIMENTO & DEPLOY

### Testes Funcionais
- [ ] Home → funciona completo
- [ ] Login → funciona completo
- [ ] Register → funciona completo
- [ ] Admin panel → funciona completo
- [ ] Empresas CRUD → funciona completo
- [ ] Contatos CRM → funciona completo
- [ ] Tarefas → funciona completo
- [ ] Financeiro → funciona completo
- [ ] Petmax IA → funciona completo
- [ ] Planos SaaS → funciona completo

### Responsividade
- [ ] Desktop 1920px ✓
- [ ] Tablet 768px ✓
- [ ] Mobile 375px ✓
- [ ] Sem scroll horizontal
- [ ] Toque/touch funciona

### SEO
- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- [ ] Robots.txt (opcional)
- [ ] Sitemap.xml (opcional)

### Performance
- [ ] Imagens otimizadas
- [ ] Bundle < 500kb
- [ ] Load time < 3s
- [ ] Lazy loading imagens

### Documentação
- [ ] README.md atualizado
- [ ] SETUP.md (rodar local)
- [ ] API.md (endpoints)
- [ ] DEPLOYMENT.md
- [ ] .env.example completo

### Erros & Tratamento
- [ ] Validação todos inputs
- [ ] Mensagens erro claras
- [ ] Toast notifications
- [ ] Fallback API down
- [ ] Console sem warnings

### Deploy
- [ ] Todos commits pushados
- [ ] Nenhum conflito Git
- [ ] .env.local NÃO commitado
- [ ] Vercel conectado
- [ ] Deploy automático configurado
- [ ] Site online
- [ ] Testado em produção

### Antes do Launch
- [ ] TUDO testado
- [ ] TUDO funcional
- [ ] Site está ONLINE
- [ ] Admin pode gerenciar
- [ ] **PRONTO PARA LANÇAR**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🆘 TROUBLESHOOTING RÁPIDO

### "Erro de autenticação Supabase"
- [ ] Verificar API key no .env
- [ ] Verificar URL Supabase
- [ ] Testar conexão direto no Supabase dashboard
- [ ] Verificar RLS policies

### "Erro de banco de dados"
- [ ] Verificar se tabela existe
- [ ] Verificar permissões RLS
- [ ] Testar query no Supabase SQL Editor
- [ ] Verificar logs de erro

### "Chat IA não responde"
- [ ] Verificar API key Minimax
- [ ] Verificar limite de requisições
- [ ] Testar com curl/Postman
- [ ] Verificar prompt do sistema

### "Financeiro não calcula"
- [ ] Verificar dados no banco
- [ ] Verificar formato dos valores
- [ ] Testar cálculo manualmente

### "Deploy Vercel não funciona"
- [ ] Verificar variáveis ambiente Vercel
- [ ] Verificar logs Vercel
- [ ] Verificar build local
- [ ] Fazer git push novamente

---

## 📞 RESUMO RÁPIDO

**Hoje vou trabalhar em:** ______________

**Fase atual:** 🔢 _____ 

**O que preciso fazer:**
- [ ] Tarefa 1
- [ ] Tarefa 2
- [ ] Tarefa 3

**Preciso pedir autorização?** Sim ☐ Não ☐

**Quando terminar:** Vou avisar com checklist completo

---

**Impressione-se com a organização! 🚀**