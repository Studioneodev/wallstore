# 🎯 PROMPTS PARA DESENVOLVIMENTO - PETMAX ERP+CRM

**Use estes prompts para guiar o desenvolvimento de cada fase**  
**Copie e cole conforme necessário**

---

## 🏗️ PROMPT_FASE1_SETUP
### Setup Inicial & Estrutura

```
Estou criando um sistema ERP+CRM completo chamado Petmax usando Open Code (Antigravity).

ESCOPO FASE 1:
1. Estrutura de pastas inicial (conforme arquivo README)
2. Página HOME básica (sem login ainda)
3. Páginas de Login e Registro
4. Sistema de rotas (Home, Login, Register, Admin, NotFound)
5. Configuração inicial Supabase
6. Componente Navigation header simples
7. GitHub + Vercel configurado

TÉCNICAS:
- React com Vite
- Context API para estado
- CSS/Tailwind para estilo (se possível)
- Supabase client configurado
- React Router v6

IMPORTANTE:
- NÃO fazer autenticação real ainda (só estrutura)
- NÃO criar banco de dados ainda
- Apenas páginas estáticas
- Home com botões "Login" e "Acessar Sistema"
- Login com formulário básico
- Register com formulário básico

Por favor:
1. Crie a estrutura de pastas
2. Crie arquivos básicos de componentes
3. Configure React Router
4. Crie páginas Home, Login, Register, Admin
5. Estile minimamente (funcional)
6. Não faça commits ainda

Vamos começar?
```

---

## 🔐 PROMPT_FASE2_AUTH
### Autenticação com Supabase

```
FASE 2: Sistema de Autenticação com Supabase

ESCOPO:
1. Configurar Supabase (tabela users)
2. RLS Policies no Supabase
3. AuthContext com Context API
4. Hook useAuth para usar em toda app
5. Função login real (Supabase)
6. Função register real (Supabase)
7. Função logout
8. JWT token no localStorage
9. ProtectedRoute para rotas admin
10. Verificar se usuário é admin

SUPABASE:
- Tabela: users
  - id (UUID, PK)
  - email (STRING, UNIQUE)
  - senha (handled by Supabase Auth)
  - is_admin (BOOLEAN, default false)
  - company_id (UUID, nullable)
  - role (STRING)
  - created_at (TIMESTAMP)
  - name (STRING)

- RLS Policies:
  - Todos leem próprios dados
  - Admin lê todos os dados

CÓDIGO:
- services/supabaseClient.js: Inicializar cliente Supabase
- context/AuthContext.jsx: Estado global de autenticação
- hooks/useAuth.js: Hook para usar contexto
- components/auth/ProtectedRoute.jsx: Proteger rotas admin
- components/auth/LoginForm.jsx: Login real
- components/auth/RegisterForm.jsx: Register real

APÓS COMPLETAR:
- Login deve funcionar 100%
- Register deve criar usuário
- Logout limpa token
- Rota /admin redireciona se não admin
- Token salvo no localStorage

Por favor, implemente tudo isso?
```

---

## 🎨 PROMPT_FASE3_ADMIN_BASE
### Layout Base do Painel Admin

```
FASE 3: Painel Admin - Interface Base

ESCOPO:
1. Layout do painel admin (sidebar + main)
2. Menu lateral com 6+ seções
3. Cada seção com página vazia (prototipo)
4. Header com dados do admin
5. Logout button
6. Responsive (mobile friendly)
7. Dark mode amigável

MENU ADMIN (6+ seções):
- 📊 Dashboard (overview)
- 🏢 Empresas (gestão)
- 👥 Contatos (CRM)
- 📋 Tarefas/Projetos
- 💰 Financeiro
- 🤖 Petmax IA
- ⚙️ Configurações

LAYOUT:
- Sidebar esquerda (240px)
- Main content area
- Header com nome do admin + logout
- Footer opcional

COMPONENTES:
- components/admin/AdminLayout.jsx (wrapper)
- components/admin/AdminSidebar.jsx
- components/admin/AdminHeader.jsx
- pages/AdminPanel.jsx (main page)
- Subpages para cada seção (vazias por enquanto)

ESTILO:
- Tema escuro/claro profissional
- Cores: primária (azul ou roxo), secundária
- Tipografia clara
- Icones (pode usar lucide-react)

IMPORTANTE:
- Apenas prototipo visual
- Nenhuma funcionalidade real ainda
- Menú clicável mas vazio
- Só layout e componentes

Quando estiver pronto, me avise para fazer commit?
```

---

## 🏢 PROMPT_FASE4_MODULOS_ERP_CRM
### Módulos ERP+CRM Completo

```
FASE 4: Sistema de Gestão Empresarial (ERP+CRM)

ESCOPO:
1. Tabela Supabase: companies (Empresas)
2. Tabela Supabase: contacts (CRM Contatos)
3. Tabela Supabase: tasks (Tarefas)
4. Tabela Supabase: projects (Projetos)
5. CRUD completo para cada módulo
6. Dashboard com estatísticas
7. Pipeline de vendas (CRM)

TABELAS SUPABASE:

companies:
- id (UUID, PK)
- name (STRING)
- trade_name (STRING)
- cnpj (STRING, UNIQUE)
- cpf (STRING)
- email (STRING)
- phone (STRING)
- address (TEXT)
- city (STRING)
- state (STRING)
- country (STRING)
- plan (STRING)
- is_active (BOOLEAN)
- created_by (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

contacts:
- id (UUID, PK)
- company_id (UUID, FK)
- name (STRING)
- email (STRING)
- phone (STRING)
- whatsapp (STRING)
- company_name (STRING)
- position (STRING)
- source (STRING)
- status (STRING: lead, cliente, inativo)
- pipeline_stage (STRING: novo, qualificado, proposta, ganho, perdido)
- value (DECIMAL)
- notes (TEXT)
- tags (ARRAY)
- assigned_to (UUID)
- created_by (UUID)
- created_at (TIMESTAMP)

tasks:
- id (UUID, PK)
- title (STRING)
- description (TEXT)
- priority (STRING: baixa, media, alta, urgente)
- status (STRING: pendente, em_progresso, concluida)
- due_date (DATE)
- category (STRING)
- project_id (UUID)
- assigned_to (UUID)
- company_id (UUID)
- created_by (UUID)
- created_at (TIMESTAMP)
- completed_at (TIMESTAMP)

projects:
- id (UUID, PK)
- name (STRING)
- description (TEXT)
- status (STRING)
- start_date (DATE)
- end_date (DATE)
- company_id (UUID)
- created_by (UUID)
- created_at (TIMESTAMP)

COMPONENTES:
- components/admin/CompanyManager.jsx
- components/admin/CompanyForm.jsx
- components/admin/CompanyList.jsx
- components/admin/ContactManager.jsx
- components/admin/ContactForm.jsx
- components/admin/ContactList.jsx
- components/admin/SalesPipeline.jsx
- components/admin/TaskManager.jsx
- components/admin/TaskForm.jsx
- components/admin/TaskList.jsx
- components/admin/ProjectManager.jsx
- components/admin/Dashboard.jsx

SERVICES:
- services/companyService.js
- services/contactService.js
- services/taskService.js

FUNCIONALIDADES:
1. Empresas:
   - Criar/Editar/Deletar empresa
   - Ativar/Inativar
   - Campos: nome, CNPJ/CPF, contato, endereço

2. Contatos (CRM):
   - CRUD completo
   - Pipeline Kanban (novo → qualificado → proposta → ganho → perdido)
   - Filtros por status
   - Buscar por nome/email
   - Histórico de interações

3. Tarefas:
   - CRUD completo
   - Prioridade (baixa, média, alta, urgente)
   - Status (pendente, em progresso, concluída)
   - Data de entrega
   - Assignar usuário

4. Dashboard:
   - Total de empresas
   - Total de contatos
   - Contatos por estágio (pipeline)
   - Tarefas pendentes/concluídas
   - Gráficos simples

APÓS COMPLETAR:
- CRUD Empresas ✓
- CRUD Contatos ✓
- Pipeline CRM ✓
- CRUD Tarefas ✓
- Dashboard com stats ✓

Posso começar a implementar?
```

---

## 🤖 PROMPT_FASE5_IA_INTEGRATION
### Integração IA - Petmax AI

```
FASE 5: Chat com Inteligência Artificial - Petmax AI

ESCOPO:
1. Integração API Minimax (chat)
2. Componente PetmaxAI com histórico
3. Prompts de sistema contextualizados para ERP+CRM
4. Tratamento de erros
5. Loading states

MINIMAX - CHAT IA:
- Criar services/petmaxAI.js
- Função: sendMessage(message, context)
- Context: histórico de chat
- System prompt: "Você é assistente virtual Petmax, especializado em gestão empresarial, questões fiscais, financeiras e consultoria. Ajude o usuário com dúvidas sobre ERP, CRM, legislação brasileira, impostos, contabilidade, gestão de empresas, etc. Seja claro, objetivo e profissional."
- Salvar histórico em estado local
- Mostrar resposta em tempo real

COMPONENTE PetmaxAI:
- components/admin/PetmaxAI.jsx
- Input para digitar mensagem
- Botão enviar
- Histórico exibido acima
- Loading spinner durante resposta
- Mensagens do usuário vs IA diferenciadas (cores)
- Limpar histórico button

RECURSOS IA:
- Dúvidas fiscais (ICMS, ISS, PIS, COFINS)
- Dúvidas trabalhistas (CLT, contratos)
- Dúvidas contábeis (balanço, DRE)
- Dúvidas financeiras (fluxo de caixa, margem)
- Consultoria geral empresarial
- Sugestões de gestão
- Análise de dados

VARIABLES .env:
- VITE_MINIMAX_API_KEY
- VITE_MINIMAX_MODEL (qual modelo usar)

TRATAMENTO ERROS:
- API indisponível: mostrar mensagem
- Quota excedida: avisar usuário
- Erro de conexão: retry button

APÓS COMPLETAR:
- Chat funciona ✓
- Histórico persiste ✓
- Respostas contextualizadas ✓
- Error handling ✓

Vamos codar?
```

---

## 💰 PROMPT_FASE6_FINANCEIRO
### Módulo Financeiro

```
FASE 6: Sistema Financeiro Completo

ESCOPO:
1. Tabela Supabase: receitas
2. Tabela Supabase: despesas
3. CRUD completo financeiro
4. Fluxo de caixa
5. Relatórios financeiros
6. Gráficos de evolução

TABELAS SUPABASE:

receitas:
- id (UUID, PK)
- company_id (UUID, FK)
- description (STRING)
- amount (DECIMAL)
- category (STRING)
- source (STRING)
- date (DATE)
- received (BOOLEAN)
- paid_at (TIMESTAMP)
- notes (TEXT)
- created_by (UUID)
- created_at (TIMESTAMP)

despesas:
- id (UUID, PK)
- company_id (UUID, FK)
- description (STRING)
- amount (DECIMAL)
- category (STRING)
- supplier (STRING)
- date (DATE)
- paid (BOOLEAN)
- paid_at (TIMESTAMP)
- notes (TEXT)
- created_by (UUID)
- created_at (TIMESTAMP)

COMPONENTES:
- components/admin/Financeiro.jsx (dashboard)
- components/admin/Receitas.jsx
- components/admin/ReceitaForm.jsx
- components/admin/ReceitaList.jsx
- components/admin/Despesas.jsx
- components/admin/DespesaForm.jsx
- components/admin/DespesaList.jsx
- components/admin/FluxoCaixa.jsx
- components/admin/RelatoriosFinanceiros.jsx

SERVICES:
- services/financeiroService.js

CATEGORIAS RECEITAS:
- Vendas de produtos
- Prestação de serviços
- Investimentos
- Outras receitas

CATEGORIAS DESPESAS:
- Custos operacionais
- Marketing e publicidade
- Despesas administrativas
- Folha de pagamento
- Aluguel e utilidades
- Tecnologia
- Jurídico
- Outras despesas

FUNCIONALIDADES:
1. Receitas:
   - Registrar receita
   - Editar receita
   - Deletar receita
   - Marcar como recebido
   - Filtrar por período
   - Listar por categoria

2. Despesas:
   - Registrar despesa
   - Editar despesa
   - Deletar despesa
   - Marcar como pago
   - Filtrar por período
   - Listar por categoria

3. Fluxo de Caixa:
   - Saldo atual (receitas - despesas)
   - Total receitas período
   - Total despesas período
   - Gráfico evolução mensal
   - Saldo projetado

4. Relatórios:
   - Receitas por categoria
   - Despesas por categoria
   - Comparativo mensal
   - Balanço simplificado

APÓS COMPLETAR:
- Registrar receita ✓
- Registrar despesa ✓
- Fluxo de caixa ✓
- Relatórios ✓

Vamos fazer?
```

---

## ☁️ PROMPT_FASE7_SAAS
### Sistema SaaS - Multi-empresa

```
FASE 7: Sistema SaaS - Multi-empresas e Planos

ESCOPO:
1. Tabela Supabase: plans (planos)
2. Tabela Supabase: subscriptions (assinaturas)
3. Gestão de planos de assinatura
4. Sistema multi-empresa (multi-tenancy)
5. Controle de limites por plano
6. Configurações por empresa

TABELAS SUPABASE:

plans:
- id (UUID, PK)
- name (STRING)
- description (TEXT)
- price (DECIMAL)
- interval (STRING: month, year)
- features (JSONB)
- limits (JSONB)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)

subscriptions:
- id (UUID, PK)
- company_id (UUID, FK)
- plan_id (UUID, FK)
- status (STRING: active, cancelled, expired)
- started_at (TIMESTAMP)
- expires_at (TIMESTAMP)
- cancelled_at (TIMESTAMP)
- created_at (TIMESTAMP)

COMPONENTES:
- components/admin/Planos.jsx
- components/admin/PlanoForm.jsx
- components/admin/PlanoList.jsx
- components/admin/Settings.jsx
- components/admin/CompanySettings.jsx

SERVICES:
- services/subscriptionService.js

PLANOS PADRÃO:
1. Free (R$ 0/mês)
   - 1 usuário
   - 100 contatos
   - 50 tarefas
   - Sem IA

2. Basic (R$ 97/mês)
   - 5 usuários
   - 1000 contatos
   - 500 tarefas
   - IA básica

3. Pro (R$ 297/mês)
   - Usuários ilimitados
   - Contatos ilimitados
   - Tarefas ilimitadas
   - IA completa

FUNCIONALIDADES:
1. Planos:
   - Listar planos
   - Criar plano
   - Editar plano
   - Definir preço
   - Definir features
   - Definir limites

2. Assinaturas:
   - Criar assinatura
   - Verificar status
   - Renovar
   - Cancelar
   - Verificar limites

3. Multi-empresa:
   - Isolamento de dados por company_id
   - Filtros automáticos por empresa
   - Super admin vs admin empresa
   - Configurações por empresa

4. Configurações:
   - Dados da empresa
   - Logo e cores
   - Configurações de módulo
   - Usuários da empresa

APÓS COMPLETAR:
- Planos funcionando ✓
- Assinaturas funcionando ✓
- Multi-empresa funcionando ✓
- Isolamento de dados ✓

Vamos codar?
```

---

## ✨ PROMPT_FASE8_POLISH
### Polimento & Deploy Produção

```
FASE 8: Testes, Otimização & Deploy Final

ESCOPO:
1. Testes funcionais manuais completos
2. Responsividade mobile/tablet
3. SEO básico
4. Performance (otimizar imagens, bundle)
5. Tratamento de todos os erros
6. Documentação
7. Deploy final em Vercel
8. Monitoramento

CHECKLIST FUNCIONAL:
Home:
- [ ] Loads sem erros
- [ ] Layout responsivo
- [ ] Buttons direcionam correto

Auth:
- [ ] Register cria usuário
- [ ] Login autentica
- [ ] Logout limpa estado
- [ ] Proteção de rotas funciona

Admin:
- [ ] Só admin pode acessar
- [ ] CRUD empresas 100%
- [ ] CRUD contatos 100%
- [ ] Pipeline CRM funciona
- [ ] CRUD tarefas 100%
- [ ] Financeiro completo
- [ ] Petmax IA funciona

RESPONSIVIDADE:
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Sem scroll horizontal
- [ ] Toque funciona bem

SEO:
- [ ] Meta tags (title, description)
- [ ] Open Graph (FB/LinkedIn)
- [ ] Sitemap.xml (opcional)
- [ ] robots.txt (opcional)

PERFORMANCE:
- [ ] Imagens otimizadas (webp, comprimidas)
- [ ] Bundle size < 500kb
- [ ] Load time < 3s
- [ ] Lazy loading de imagens

ERROS:
- [ ] Validação todos os inputs
- [ ] Mensagens erro claras
- [ ] Fallbacks para API down
- [ ] Toast notifications para feedback

DOCUMENTAÇÃO:
- [ ] README.md principal
- [ ] SETUP.md (como rodar local)
- [ ] API.md (endpoints)
- [ ] DEPLOYMENT.md (como fazer deploy)

DEPLOY:
```bash
git add .
git commit -m "[FASE8] Polimento e deploy final"
git push origin main
# Vercel faz deploy automático
```

APÓS COMPLETAR:
- Tudo funciona ✓
- Site está online ✓
- Sem erros no console ✓
- Mobile responsivo ✓
- Admin pode gerenciar ✓

Estamos prontos para lançar!
```

---

## 🚀 COMO USAR ESTES PROMPTS

1. **Para cada fase:** Copie o prompt correspondente
2. **Inclua no seu pedido:** Cole o prompt + contexto
3. **Revise antes:** Certifique que fase anterior está 100%
4. **Peça confirmação:** "Posso começar a fase X?"
5. **Acompanhe:** Verifique checklist da fase

---

## 📋 ORDEM RECOMENDADA

```
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8
```

**Não pule fases!** Cada uma depende da anterior.

---

## 🆘 SE ALGO NÃO ESTIVER CLARO

**Sempre pergunte:**
- "Que estrutura de banco usar?"
- "Qual tabela está faltando?"
- "Como fazer o pipeline?"

**Nunca suponha!**

---

**Versão:** 2.0  
**Atualizado:** Hoje  
**Próxima revisão:** Após Fase 1 completa