# ✅ CHECKLIST PRÁTICO - WALLPAPER STORE

**Use este arquivo para acompanhar progresso e garantir qualidade**

---

## 🎯 ANTES DE COMEÇAR (TODOS OS DIAS)

### Checklist de Abertura
- [ ] Li o README.md completamente?
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
- [ ] Sidebar com 5 menu items

### Menu Items (vazios, apenas navegação)
- [ ] 📊 Dashboard
- [ ] 🖼️ Wallpapers
- [ ] 💬 Chat IA
- [ ] 🎨 Gerar Imagens
- [ ] 💰 Vendas & Clientes

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

## 📦 FASE 4: WALLPAPER CRUD

### Supabase
- [ ] Tabela `wallpapers` criada com campos
- [ ] Bucket `wallpapers` criado em Storage
- [ ] RLS policies para upload/read/edit/delete
- [ ] Índices criados se necessário

### Código
- [ ] `services/wallpaperService.js` criado
- [ ] `components/admin/WallpaperManager.jsx`
- [ ] `components/admin/WallpaperForm.jsx`
- [ ] `components/admin/WallpaperList.jsx`
- [ ] Validações de formulário

### Funcionalidades - CREATE
- [ ] Input: title (required)
- [ ] Input: description (required)
- [ ] Select: category (dropdown)
- [ ] Input: price (decimal, BRL)
- [ ] File upload: imagem (jpg, png)
- [ ] Botão: Salvar
- [ ] Validar tipo arquivo (image/*)
- [ ] Validar tamanho (< 5MB)
- [ ] Upload para Supabase Storage
- [ ] Registrar em tabela wallpapers
- [ ] Mostrar sucesso/erro

### Funcionalidades - READ
- [ ] Listar todos wallpapers do admin
- [ ] Mostrar em tabela ou cards
- [ ] Colunas: imagem (thumb), título, categoria, preço, ações
- [ ] Imagem thumbnail carrega rápido
- [ ] Ordem: mais recentes primeiro

### Funcionalidades - UPDATE
- [ ] Clicar editar → preenche formulário
- [ ] Editar campos
- [ ] Reuploar imagem (opcional)
- [ ] Salvar mudanças
- [ ] Mostrar sucesso
- [ ] Lista atualiza

### Funcionalidades - DELETE
- [ ] Botão deletar com confirmação
- [ ] Confirmar: "Tem certeza?"
- [ ] Deletar da tabela
- [ ] Limpar storage (imagem)
- [ ] Lista atualiza

### Dados Armazenados
- [ ] id (UUID)
- [ ] title
- [ ] description
- [ ] category (enum)
- [ ] price
- [ ] image_url (link do storage)
- [ ] created_by (admin id)
- [ ] created_at
- [ ] updated_at
- [ ] is_active (soft delete)

### Testes Manuais
- [ ] Criar wallpaper novo → aparece lista ✓
- [ ] Upload imagem → salva no Storage ✓
- [ ] Editar wallpaper → atualiza ✓
- [ ] Deletar wallpaper → desaparece ✓
- [ ] Validação: title vazio → erro ✓
- [ ] Validação: arquivo grande → erro ✓
- [ ] Categoria filtra correto ✓
- [ ] Preço calcula certo ✓

### Antes do Commit
- [ ] CRUD 100% funcional
- [ ] Validações funcionam
- [ ] Imagens upload funciona
- [ ] Sem erros SQL/Supabase
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🤖 FASE 5: IA INTEGRATION

### Minimax Setup
- [ ] API key Minimax adicionada .env
- [ ] Modelo escolhido
- [ ] Documentação API estudada

### Nano Banana Setup
- [ ] API key Nano Banana adicionada .env
- [ ] Documentação API estudada

### Código Minimax
- [ ] `services/minmaxAPI.js` criado
- [ ] Função `sendMessage(message, context)`
- [ ] System prompt definido
- [ ] Histórico de chat em estado local
- [ ] `components/admin/ChatIA.jsx` criado

### Código Nano Banana
- [ ] `services/nanobanaAPI.js` criado
- [ ] Função `generateImage(prompt)`
- [ ] `components/admin/ImageGenerator.jsx` criado
- [ ] Preview de imagem gerada

### Chat IA Funcionalidades
- [ ] Input para digitar mensagem
- [ ] Enviar mensagem (Enter ou botão)
- [ ] Mostrar resposta da IA
- [ ] Histórico conversas acima
- [ ] Loading spinner durante resposta
- [ ] Diferenciar mensagens (user vs IA)
- [ ] Botão limpar histórico
- [ ] Error handling

### Image Generator Funcionalidades
- [ ] Input: descrição/prompt
- [ ] Botão: "Gerar com IA"
- [ ] Loading durante geração
- [ ] Preview imagem gerada
- [ ] Botão: "Usar esta imagem"
- [ ] Preenche WallpaperForm com imagem
- [ ] Histórico últimas 5 imagens
- [ ] Error handling

### Integração com Wallpaper
- [ ] Imagem gerada salva em Storage
- [ ] Pode ser usada como wallpaper
- [ ] Preço padrão sugerido
- [ ] Descrição preenchida do prompt

### Testes Manuais
- [ ] Chat Minimax responde ✓
- [ ] Histórico mostra corretamente ✓
- [ ] Gera imagem com Nano Banana ✓
- [ ] Preview imagem funciona ✓
- [ ] Integra com wallpaper form ✓
- [ ] Error handling funciona ✓
- [ ] Sem erros API ✓

### Antes do Commit
- [ ] Chat funciona 100%
- [ ] Gerador imagens funciona 100%
- [ ] Ambas integradas
- [ ] Sem erros
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🛍️ FASE 6: GALERIA CLIENTE

### Código
- [ ] `components/client/WallpaperGallery.jsx` (main)
- [ ] `components/client/WallpaperCard.jsx` (grid item)
- [ ] `components/client/WallpaperDetail.jsx` (modal)
- [ ] `components/client/CategoryFilter.jsx`
- [ ] `components/client/SearchBar.jsx`
- [ ] `components/client/Cart.jsx`
- [ ] `components/client/CartIcon.jsx`

### Context
- [ ] `context/CartContext.jsx` criado
- [ ] Função `addToCart(wallpaper)`
- [ ] Função `removeFromCart(id)`
- [ ] Função `updateQuantity(id, qty)`
- [ ] Função `clearCart()`
- [ ] Função `getTotalPrice()`
- [ ] Persist em localStorage

### Galeria
- [ ] Grid responsivo (3-4 colunas desktop)
- [ ] Grid 2 colunas tablet
- [ ] Grid 1 coluna mobile
- [ ] Cada card: imagem, título, preço
- [ ] Botão "Adicionar ao Carrinho"
- [ ] Hover effect (zoom, info)
- [ ] Carrega imagens do Supabase

### Filtros
- [ ] Dropdown categorias (landscapes, abstract, etc)
- [ ] Search input por título
- [ ] Filtros aplicam em tempo real
- [ ] Botão "Limpar filtros"
- [ ] Mostra contador resultados

### Modal Detalhes
- [ ] Clique card → abre modal
- [ ] Imagem grande
- [ ] Título + descrição
- [ ] Preço
- [ ] Botão "Adicionar ao Carrinho"
- [ ] Botão "Fechar"
- [ ] Close ao clicar fora

### Carrinho
- [ ] Ícone carrinho no header (com contador)
- [ ] Clique ícone → abre carrinho
- [ ] Lista items: imagem, título, preço, quantidade
- [ ] Botão remover item
- [ ] Input editar quantidade
- [ ] Subtotal por item
- [ ] Total geral
- [ ] Botão "Ir para Checkout"
- [ ] Persiste ao refresh (localStorage)

### Data
- [ ] Busca wallpapers ativos (is_active=true)
- [ ] Ordem: mais recentes primeiro
- [ ] Sem dados de admin na galeria

### Testes Manuais
- [ ] Galeria carrega ✓
- [ ] Imagens mostram ✓
- [ ] Clique card abre modal ✓
- [ ] Adicionar ao carrinho funciona ✓
- [ ] Contador carrinho atualiza ✓
- [ ] Filtro categoria funciona ✓
- [ ] Pesquisa funciona ✓
- [ ] Carrinho persiste ✓
- [ ] Responsivo (mobile, tablet, desktop) ✓

### Antes do Commit
- [ ] Tudo responsivo
- [ ] Tudo funcional
- [ ] Carrinho persiste
- [ ] Sem erros
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 💳 FASE 7: PAGAMENTO PIX

### Supabase
- [ ] Tabela `orders` criada
- [ ] Campos: id, user_id, total, status, items, pix_qr, created_at, paid_at
- [ ] RLS policies configuradas
- [ ] Índices criados

### Código
- [ ] `components/client/CheckoutPIX.jsx`
- [ ] `components/client/PIXQRCode.jsx`
- [ ] `components/client/OrderConfirmation.jsx`
- [ ] `components/admin/SalesReport.jsx`
- [ ] `components/client/MyOrders.jsx`
- [ ] `services/orderService.js`
- [ ] QRCode library (qrcode.react)

### Checkout
- [ ] Página /checkout (após carrinho)
- [ ] Resumo items
- [ ] Total final
- [ ] Botão "Pagar com PIX"
- [ ] Cálculos corretos

### PIX - Geração
- [ ] Chave PIX armazenada (.env)
- [ ] Gerar QR code (qrcode.react)
- [ ] Mostrar chave PIX para copiar
- [ ] Copiar botão (clipboard)
- [ ] Mostrar valor a transferir

### PIX - Confirmação
- [ ] Input comprovante (texto ou imagem)
- [ ] Botão "Já paguei, confirmar"
- [ ] Registra pedido em `orders`
- [ ] Status = "pending" até admin aprovar
- [ ] Mostrar pedido criado

### Admin - Aprovação
- [ ] Nova seção "Pedidos Pendentes" (Vendas)
- [ ] Listar pedidos aguardando aprovação
- [ ] Ver comprovante
- [ ] Botão "Aprovar pagamento"
- [ ] Mudar status para "paid"
- [ ] Botão "Rejeitar" (motivo opcional)

### Cliente - Histórico
- [ ] Página /my-orders
- [ ] Listar todos pedidos do usuário
- [ ] Colunas: data, items, total, status
- [ ] Status cores diferentes (pending=amarelo, paid=verde)
- [ ] Clique pedido → detalhes

### Dados Armazenados
- [ ] order id (UUID)
- [ ] user_id (FK)
- [ ] items (JSON array)
- [ ] total_amount (BRL)
- [ ] status (pending/paid/cancelled)
- [ ] pix_qr_code (base64 ou URL)
- [ ] pix_key (chave PIX)
- [ ] payment_proof (texto/imagem)
- [ ] created_at, paid_at
- [ ] notes (admin observações)

### Testes Manuais
- [ ] Carrinho → checkout ✓
- [ ] Gera QR code PIX ✓
- [ ] Chave PIX para copiar ✓
- [ ] Confirma pagamento → pedido criado ✓
- [ ] Admin vê pedido pendente ✓
- [ ] Admin aprova → status muda ✓
- [ ] Cliente vê histórico ✓
- [ ] Status mostra correto ✓

### Antes do Commit
- [ ] PIX gera correto
- [ ] Pedidos registram
- [ ] Admin aprova
- [ ] Histórico funciona
- [ ] Sem erros
- [ ] **PEDIR AUTORIZAÇÃO**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## ✨ FASE 8: POLIMENTO & DEPLOY

### Testes Funcionais
- [ ] Home → funciona completo
- [ ] Login → funciona completo
- [ ] Register → funciona completo
- [ ] Admin panel → funciona completo
- [ ] Wallpaper CRUD → funciona completo
- [ ] Chat IA → funciona completo
- [ ] Gerar imagens → funciona completo
- [ ] Galeria cliente → funciona completo
- [ ] Carrinho → funciona completo
- [ ] Checkout PIX → funciona completo
- [ ] Histórico pedidos → funciona completo
- [ ] Admin vendas → funciona completo

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
- [ ] Alt text em imagens

### Performance
- [ ] Imagens otimizadas
- [ ] Bundle < 500kb
- [ ] Load time < 3s
- [ ] Lazy loading imagens
- [ ] Cache estratégico

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
- [ ] Console sem errors

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
- [ ] Cliente pode comprar
- [ ] **PRONTO PARA LANÇAR**

**Status:** ⏳ Não iniciado | 🔄 Em progresso | ✅ Completo

---

## 🆘 TROUBLESHOOTING RÁPIDO

### "Erro de autenticação Supabase"
- [ ] Verificar API key no .env
- [ ] Verificar URL Supabase
- [ ] Testar conexão direto no Supabase dashboard
- [ ] Verificar RLS policies

### "Imagem não upload"
- [ ] Verificar tipo arquivo (jpg, png)
- [ ] Verificar tamanho (< 5MB)
- [ ] Verificar Storage bucket criado
- [ ] Verificar RLS policy Storage

### "Chat Minimax não responde"
- [ ] Verificar API key Minimax
- [ ] Verificar limite de requisições
- [ ] Testar com curl/Postman
- [ ] Verificar prompt do sistema

### "Imagem Nano Banana não gera"
- [ ] Verificar API key Nano Banana
- [ ] Verificar quota de imagens
- [ ] Testar com prompt simples
- [ ] Verificar resposta de erro

### "Carrinho não persiste"
- [ ] Verificar localStorage no browser
- [ ] Verificar console de erros
- [ ] Testar em aba privada
- [ ] Verificar Context API

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
