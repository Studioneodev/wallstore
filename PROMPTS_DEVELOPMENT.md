# 🎯 PROMPTS PARA DESENVOLVIMENTO - WALLPAPER STORE

**Use estes prompts para guiar o desenvolvimento de cada fase**  
**Copie e cole conforme necessário**

---

## 🏗️ PROMPT_FASE1_SETUP
### Setup Inicial & Estrutura

```
Estou criando um site de venda de wallpapers usando Open Code (Antigravity).

ESCOPO FASE 1:
1. Estrutura de pastas inicial (conforme arquivo README)
2. Página HOME básica (sem login ainda)
3. Páginas de Login e Registro
4. Sistema de rotas (Home, Login, Register, Admin, NotFound)
5. Configuração inicial Supabase
6. Componente Navigation header simples
7. GitHub + Vercel configurado

TÉCNICAS:
- React com vite
- Context API para estado
- CSS/Tailwind para estilo (se possível)
- Supabase client configurado
- React Router v6

IMPORTANTE:
- NÃO fazer autenticação real ainda (só estrutura)
- NÃO criar banco de dados ainda
- Apenas páginas estáticas
- Home com botões "Login" e "Ver Catálogo"
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
2. Menu lateral com 5 seções
3. Cada seção com página vazia (prototipo)
4. Header com dados do admin
5. Logout button
6. Responsive (mobile friendly)
7. Dark mode amigável

MENU ADMIN (5 seções):
- 📊 Dashboard (overview)
- 🖼️ Wallpapers (gerenciar catalogo)
- 💬 Chat IA (Minimax)
- 🎨 Gerar Imagens (Nano Banana)
- 💰 Vendas & Clientes

LAYOUT:
- Sidebar esquerda (200px)
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

## 📦 PROMPT_FASE4_WALLPAPER_CRUD
### CRUD Completo de Wallpapers

```
FASE 4: Sistema de Gerenciamento de Wallpapers (Admin)

ESCOPO:
1. Tabela Supabase: wallpapers
2. Upload de imagens (Supabase Storage)
3. CRUD completo (Create, Read, Update, Delete)
4. Validações de formulário
5. Feedback de sucesso/erro
6. Tabela listando wallpapers
7. Categorias (dropdowns)
8. Preço em BRL

TABELA SUPABASE: wallpapers
- id (UUID, PK)
- title (STRING)
- description (TEXT)
- category (ENUM: landscapes, abstract, space, nature, urban, vintage)
- price (DECIMAL, exemplo: 9.99)
- image_url (STRING, URL do Storage)
- image_path (STRING, caminho storage)
- created_by (UUID, FK users, admin)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- is_active (BOOLEAN, default true)

SUPABASE STORAGE:
- Bucket: wallpapers
- Estrutura: /wallpapers/{user_id}/{uuid}.jpg

RLS POLICIES:
- Todos leem wallpapers ativos
- Admin cria/edita/deleta seus próprios
- Admin vê todos (inclusive inativos)

COMPONENTES:
- components/admin/WallpaperManager.jsx (main)
- components/admin/WallpaperForm.jsx (criar/editar)
- components/admin/WallpaperList.jsx (tabela)
- components/admin/WallpaperCard.jsx (card individual)

FUNCIONALIDADES:
1. Formulário:
   - Input: title
   - Input: description
   - Select: category
   - Input: price
   - Input file: upload imagem
   - Botão: salvar

2. Listagem:
   - Tabela com: título, categoria, preço, imagem thumb
   - Botão editar (refill formulário)
   - Botão deletar (com confirmação)

3. Upload:
   - Validar tipo imagem (jpg, png)
   - Validar tamanho (max 5MB)
   - Mostrar progresso
   - Gerar UUID para arquivo

APÓS COMPLETAR:
- Criar wallpaper novo ✓
- Editar existente ✓
- Deletar ✓
- Upload funciona ✓
- Lista mostra atualizada ✓

Posso começar a implementar?
```

---

## 🤖 PROMPT_FASE5_IA_INTEGRATION
### Integração Minimax + Nano Banana

```
FASE 5: Chat IA (Minimax) + Geração de Imagens (Nano Banana)

ESCOPO:
1. Integração API Minimax (chat)
2. Integração API Nano Banana (geração de imagens)
3. Componente ChatIA com histórico
4. Componente ImageGenerator
5. Prompts de sistema contextualizados
6. Tratamento de erros
7. Loading states

MINIMAX - CHAT IA:
- Criar services/minmaxAPI.js
- Função: sendMessage(message, context)
- Context: histórico de chat
- System prompt: "Você é assistente de designer especializado em wallpapers. Ajude o admin a criar descrições incríveis de wallpapers, sugestões de cores, temas, etc."
- Salvar histórico em estado local
- Mostrar resposta em tempo real

COMPONENTE ChatIA:
- components/admin/ChatIA.jsx
- Input para digitar mensagem
- Botão enviar
- Histórico exibido acima
- Loading spinner durante resposta
- Mensagens do usuário vs IA diferenciadas (cores)
- Limpar histórico button

NANO BANANA - GERAÇÃO DE IMAGENS:
- Criar services/nanobanaAPI.js
- Função: generateImage(prompt)
- Prompt: descrição do wallpaper desejado
- Retorna URL da imagem gerada
- Salvar em array de imagens geradas

COMPONENTE ImageGenerator:
- components/admin/ImageGenerator.jsx
- Input: descrição/prompt
- Botão: "Gerar com IA"
- Preview da imagem gerada
- Botão: "Salvar como Wallpaper" (preenche form WallpaperForm)
- Histórico de últimas 5 imagens geradas

FLUXO:
1. Admin digita "um bonito pôr do sol em montanhas"
2. Chat IA sugere melhorias
3. Admin clica "Gerar imagem"
4. Nano Banana cria imagem
5. Preview é mostrado
6. Admin clica "Usar esta imagem"
7. Form WallpaperManager é preenchido com imagem

VARIABLES .env:
- VITE_MINIMAX_API_KEY
- VITE_MINIMAX_MODEL (qual modelo usar)
- VITE_NANOBANA_API_KEY

TRATAMENTO ERROS:
- API indisponível: mostrar mensagem
- Quota excedida: avisar admin
- Erro de conexão: retry button

APÓS COMPLETAR:
- Chat funciona ✓
- Gera imagens ✓
- Salva histórico ✓
- Integra com wallpaper form ✓

Vamos codar?
```

---

## 🛍️ PROMPT_FASE6_CLIENT_GALLERY
### Galeria de Clientes (Compra)

```
FASE 6: Galeria de Wallpapers para Clientes

ESCOPO:
1. Página de galeria pública
2. Grid de wallpapers
3. Filtro por categoria
4. Pesquisa por título
5. Cards com imagem, nome, preço
6. Modal de detalhes
7. Carrinho (Context API)
8. Visualizar carrinho
9. Checkout básico

COMPONENTES:
- components/client/WallpaperGallery.jsx (main page)
- components/client/WallpaperCard.jsx (card grid)
- components/client/WallpaperDetail.jsx (modal)
- components/client/CategoryFilter.jsx (filtros)
- components/client/SearchBar.jsx (pesquisa)
- components/client/Cart.jsx (visualizar carrinho)
- components/client/CartIcon.jsx (ícone com contador)

CONTEXT:
- context/CartContext.jsx
- Estado: [{ wallpaper_id, title, price, quantity, image_url }]
- Funções: addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice

GALERIA:
- Grid responsivo (3-4 colunas desktop, 1-2 mobile)
- Cada card mostra: imagem, título, preço, botão "Adicionar ao Carrinho"
- Hover effect: zoom leve, mostrar descrição curta

FILTROS:
- Dropdown: categorias
- Search input: titulo/descrição
- Limpar filtros button
- Contador de resultados

MODAL DETALHES:
- Imagem grande
- Título completo
- Descrição
- Preço
- Botão: "Adicionar ao Carrinho"
- Botão: "Fechar"

CARRINHO:
- Popup ou página /cart
- Listar items: imagem, título, preço, quantidade, subtotal
- Botão remover
- Input quantidade
- Total geral
- Botão: "Ir para Checkout"

CHECKOUT:
- Página /checkout
- Resumo dos items
- Total final
- Botão: "Pagar com PIX" (próxima fase)

DATA:
- Buscar wallpapers ativos do Supabase
- isActive = true
- Order by: created_at DESC

APÓS COMPLETAR:
- Galeria lista wallpapers ✓
- Filtros funcionam ✓
- Pesquisa funciona ✓
- Adicionar ao carrinho ✓
- Carrinho persiste (localStorage) ✓
- Checkout mostra resumo ✓

Começamos?
```

---

## 💳 PROMPT_FASE7_PIX_PAYMENT
### Pagamento com PIX

```
FASE 7: Sistema de Pagamento PIX

ESCOPO:
1. Gerar QR code PIX dinamicamente
2. Tela de checkout com PIX
3. Tabela de pedidos (orders) Supabase
4. Registrar pedido
5. Verificar pagamento
6. Histórico de compras (cliente)
7. Relatório de vendas (admin)

TABELA SUPABASE: orders
- id (UUID, PK)
- user_id (UUID, FK users)
- total_amount (DECIMAL)
- status (ENUM: pending, paid, cancelled)
- items (JSON array: [{wallpaper_id, title, price}])
- pix_qr_code (TEXT, base64 ou URL)
- pix_key (STRING, chave PIX ou copy-paste)
- payment_proof (TEXT, comprovante enviado)
- created_at (TIMESTAMP)
- paid_at (TIMESTAMP, null até pagar)
- notes (TEXT, observações do admin)

PIX GERAÇÃO:
Opção 1 - Manual (mais simples):
- Admin registra chave PIX no .env
- Mostrar chave PIX para copiar
- Mostrar QR code (usar lib qrcode.react)
- Cliente transfere valor + diz que pagou

Opção 2 - API PIX (mais profissional):
- Integrar com Itaú/Banco24h/Efí (precisar credenciais)
- Gerar PIX dinâmico com e2eid
- Webhook para confirmar pagamento automático

COMEÇAR COM OPÇÃO 1 (mais rápido)

COMPONENTES:
- components/client/CheckoutPIX.jsx (formulário PIX)
- components/client/PIXQRCode.jsx (mostra QR)
- components/client/OrderConfirmation.jsx (após pagamento)
- components/admin/SalesReport.jsx (relatório admin)
- components/client/MyOrders.jsx (histórico cliente)

FLUXO CHECKOUT:
1. Cliente em /checkout vê resumo
2. Clica "Pagar com PIX"
3. Tela mostra:
   - QR Code
   - Valor total
   - Chave PIX (copiar)
   - Input: "Comprovante de pagamento"
4. Cliente transfere
5. Clica: "Já paguei, confirmar"
6. Admin recebe notificação
7. Admin verifica e marca como "paid"
8. Cliente recebe email de confirmação

RLS POLICIES:
- Usuário vê seus próprios pedidos
- Admin vê todos
- Criar pedido: qualquer usuário autenticado
- Aprovar pedido: apenas admin

APÓS COMPLETAR:
- Gerar QR code PIX ✓
- Registrar pedido ✓
- Mostrar histórico ✓
- Admin aprovar pagamento ✓
- Email (opcional) ✓

Vamos fazer?
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
- [ ] CRUD wallpapers 100%
- [ ] Chat Minimax funciona
- [ ] Geração imagens Nano Banana funciona
- [ ] Salvar imagem como wallpaper

Cliente:
- [ ] Vê galeria completa
- [ ] Filtros funcionam
- [ ] Pesquisa funciona
- [ ] Adiciona ao carrinho
- [ ] Checkout PIX gera QR
- [ ] Pedido registrado
- [ ] Vê histórico de compras

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
- Cliente pode comprar ✓

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
- "Que ferramenta exatamente para gerar PIX?"
- "Qual tabela Supabase está faltando?"
- "Como salvar imagens em Storage?"

**Nunca suponha!**

---

**Versão:** 1.0  
**Atualizado:** Hoje  
**Próxima revisão:** Após Fase 1 completa
