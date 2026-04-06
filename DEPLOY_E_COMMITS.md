# 📅 CRONOGRAMA & PROCESSO DE DEPLOY

**Guia passo-a-passo para commits e deployment**

---

## 📊 CRONOGRAMA VISUAL

```
SEMANA 1
├── Dia 1-2: FASE 1 (Setup) ✓
├── Dia 2-3: FASE 2 (Auth) ✓
└── Dia 3-4: FASE 3 (Admin Base) ✓

SEMANA 2
├── Dia 5-6: FASE 4 (Wallpaper CRUD) ✓
├── Dia 6-7: FASE 5 (IA Integration) ✓
└── Dia 7: PHASE 5 Completa ✓

SEMANA 3
├── Dia 8-9: FASE 6 (Galeria Cliente) ✓
├── Dia 10: FASE 7 (PIX Pagamento) ✓
└── Dia 11: Testes Iniciais ✓

SEMANA 4
├── Dia 12-13: FASE 8 (Polimento) ✓
├── Dia 14: DEPLOY FINAL ✓
└── Dia 15: Suporte & Ajustes ✓
```

---

## 🔄 PROCESSO DE COMMIT & DEPLOY

### ⚠️ ANTES DE QUALQUER COMMIT:

1. **Pergunte ao usuário:**
   ```
   "Terminei a funcionalidade [NOME].
   
   Arquivos modificados:
   - src/components/admin/ChatIA.jsx
   - src/services/minmaxAPI.js
   - src/context/ChatContext.jsx
   
   Alterações:
   - ✅ Integração Minimax completa
   - ✅ Chat com histórico funcional
   - ✅ Validações adicionadas
   
   Posso fazer commit e deploy agora?"
   ```

2. **Aguarde aprovação explícita:**
   - "Sim, pode fazer commit"
   - "Tudo ok, faz deploy"
   - "Pode commitar"

3. **Apenas após aprovação, execute:**

### ✅ PROCESSO DE COMMIT

```bash
# 1. Verificar status
git status

# 2. Adicionar arquivos
git add .

# 3. Fazer commit com mensagem padrão
git commit -m "[FASE-X] Descrição da funcionalidade

- Item 1 realizado
- Item 2 realizado
- Item 3 realizado"

# 4. Push para main
git push origin main

# 5. Aguarde Vercel fazer deploy automático (~2-5 min)
# 6. Verifique: https://seu-site.vercel.app

# 7. Confirme ao usuário:
"✅ Deploy concluído com sucesso!
Site online em: https://seu-site.vercel.app"
```

---

## 📋 TEMPLATE DE COMMIT

**Use este template para cada commit:**

```
[FASE-X] Título descritivo da funcionalidade

Alterações:
- ✅ Funcionalidade 1 completa
- ✅ Funcionalidade 2 completa
- ✅ Validações adicionadas

Arquivos modificados:
- src/components/novo.jsx
- src/services/novo.js
- src/styles/novo.css

Testes realizados:
- ✓ Teste 1
- ✓ Teste 2
- ✓ Teste 3

Status: Pronto para produção
```

---

## 🎯 TEMPLATES POR FASE

### COMMIT FASE 1
```
[FASE-1] Setup inicial e estrutura do projeto

Alterações:
- ✅ Estrutura de pastas criada
- ✅ React Router configurado
- ✅ Pages: Home, Login, Register, Admin
- ✅ Componentes básicos de navegação

Arquivos:
- src/App.jsx
- src/pages/
- src/components/shared/
- package.json

Status: Pronto para fase 2
```

### COMMIT FASE 2
```
[FASE-2] Autenticação com Supabase

Alterações:
- ✅ Login funcional
- ✅ Register cria usuário
- ✅ Context API para autenticação
- ✅ Proteção de rotas (admin)

Arquivos:
- src/services/supabaseClient.js
- src/context/AuthContext.jsx
- src/hooks/useAuth.js
- src/components/auth/

Status: Pronto para fase 3
```

### COMMIT FASE 3
```
[FASE-3] Painel Admin - Layout base

Alterações:
- ✅ Dashboard admin criado
- ✅ Sidebar com 5 seções
- ✅ Menu navegável
- ✅ Responsivo

Arquivos:
- src/components/admin/AdminLayout.jsx
- src/components/admin/AdminSidebar.jsx
- src/pages/AdminPanel.jsx

Status: Pronto para fase 4
```

### COMMIT FASE 4
```
[FASE-4] CRUD Wallpapers - Completo

Alterações:
- ✅ Create wallpaper (upload imagem)
- ✅ Read wallpapers (lista)
- ✅ Update wallpaper
- ✅ Delete wallpaper
- ✅ Validações (tipo, tamanho)

Arquivos:
- src/components/admin/WallpaperManager.jsx
- src/components/admin/WallpaperForm.jsx
- src/services/wallpaperService.js
- Supabase: tabela wallpapers + Storage

Status: Pronto para fase 5
```

### COMMIT FASE 5
```
[FASE-5] IA Integration - Minimax + Nano Banana

Alterações:
- ✅ Chat Minimax com histórico
- ✅ Gerar imagens Nano Banana
- ✅ Preview de imagens
- ✅ Integração com wallpaper form

Arquivos:
- src/services/minmaxAPI.js
- src/services/nanobanaAPI.js
- src/components/admin/ChatIA.jsx
- src/components/admin/ImageGenerator.jsx

Status: Pronto para fase 6
```

### COMMIT FASE 6
```
[FASE-6] Galeria Cliente - Completo

Alterações:
- ✅ Grid responsivo wallpapers
- ✅ Filtro por categoria
- ✅ Pesquisa por título
- ✅ Modal de detalhes
- ✅ Carrinho funcional
- ✅ Persistência localStorage

Arquivos:
- src/components/client/WallpaperGallery.jsx
- src/components/client/Cart.jsx
- src/context/CartContext.jsx
- src/pages/HomePage.jsx

Status: Pronto para fase 7
```

### COMMIT FASE 7
```
[FASE-7] Pagamento PIX - Completo

Alterações:
- ✅ Geração QR code PIX
- ✅ Página checkout funcional
- ✅ Tabela orders criada
- ✅ Admin aprova pagamentos
- ✅ Histórico pedidos cliente

Arquivos:
- src/components/client/CheckoutPIX.jsx
- src/components/admin/SalesReport.jsx
- src/services/orderService.js
- Supabase: tabela orders

Status: Pronto para fase 8
```

### COMMIT FASE 8
```
[FASE-8] Polimento, testes e deploy final

Alterações:
- ✅ Responsividade mobile/tablet
- ✅ Otimização performance
- ✅ SEO básico (meta tags)
- ✅ Documentação completa
- ✅ Todos erros tratados
- ✅ Deploy em produção

Arquivos:
- Documentação: README.md, SETUP.md, API.md
- Vercel configurado
- .env.example atualizado

Status: 🚀 SITE LIVE!
```

---

## 🔍 CHECKLIST ANTES DO COMMIT

**SEMPRE verificar antes de commitar:**

- [ ] Testei a funcionalidade completamente
- [ ] Não há erros no console (F12)
- [ ] Não há warnings
- [ ] Validações funcionam
- [ ] Responsividade ok
- [ ] .env.local NÃO foi adicionado
- [ ] Código está limpo (sem comentários de debug)
- [ ] Commits mensagens claras
- [ ] Pedi autorização ao usuário
- [ ] Aprovação foi explícita

---

## 🚨 SE ALGO DER ERRADO

### Erro durante push:
```bash
# Conflito? Resolver:
git pull origin main
# Resolver conflitos manualmente
git add .
git commit -m "Resolver conflito de merge"
git push origin main
```

### Vercel deploy falhou:
```bash
# Verificar logs no dashboard Vercel
# Se for erro de build:
npm run build  # testar local

# Se for erro de variáveis:
# Adicionar em Vercel Settings > Environment Variables
```

### Preciso desfazer último commit:
```bash
# Se ainda não fez push:
git reset --soft HEAD~1
git reset HEAD .

# Se já fez push:
git revert HEAD
git push origin main
```

---

## ✨ APÓS CADA FASE - RITUAL COMPLETO

### Passo 1: Testar Tudo
```
"Testei completamente a fase X:
- Feature 1: ✓ Funciona
- Feature 2: ✓ Funciona
- Feature 3: ✓ Funciona
Sem erros encontrados."
```

### Passo 2: Pedir Autorização
```
"Posso fazer commit e deploy da fase X agora?"
```

### Passo 3: Aguardar Aprovação
```
[AGUARDANDO RESPOSTA DO USUÁRIO]
```

### Passo 4: Fazer Commit
```bash
git add .
git commit -m "[FASE-X] Descrição"
git push origin main
```

### Passo 5: Confirmar Deploy
```
"Deploy concluído!
Fase X 100% completa e online.
Próximo: Fase X+1"
```

---

## 📱 NOTIFICAÇÃO PADRÃO DE PROGRESSO

**Ao terminar cada fase, avisar:**

```
✅ FASE X COMPLETA!

O que foi feito:
- ✓ Funcionalidade 1
- ✓ Funcionalidade 2
- ✓ Funcionalidade 3

Arquivos modificados: N
Commit: [FASE-X] Descrição
Deploy: ✓ Online

Próxima: FASE X+1
Estimado: [TEMPO] horas

Alguma observação ou ajuste?
```

---

## 🎯 RESUMO - O QUE VOCÊ DEVE FAZER

**Como usuário, seu workflow é:**

1. **Eu término funcionalidade**
2. **Eu aviso você** com detalhes do que fiz
3. **Você testa** (não precisa, confio)
4. **Você pergunta:** "Posso fazer commit?"
5. **Você aguarda aprovação explícita**
6. **Você executa git push**
7. **Vercel faz deploy automático**
8. **Você avisa que está online**
9. **Próxima funcionalidade**

---

## 🔐 SEGURANÇA - LEMBRETE

**NUNCA COMMITAR:**
- ❌ .env.local
- ❌ Chaves API expostas
- ❌ Senhas
- ❌ node_modules
- ❌ build/ ou dist/
- ❌ .DS_Store (Mac)

**SEMPRE COMMITAR:**
- ✅ .env.example (sem valores)
- ✅ package.json
- ✅ package-lock.json
- ✅ .gitignore
- ✅ Código fonte
- ✅ Documentação

---

## 📞 CONTATOS ÚTEIS

- **GitHub:** https://github.com/Studioneodev/wallstore
- **Vercel:** https://vercel.com/studioneodevs-projects
- **Supabase:** https://supabase.io/dashboard
- **Minimax:** https://api.minimax.chat/docs
- **Nano Banana:** https://api.nanobana.ch/docs

---

**Versão:** 1.0  
**Última atualização:** Hoje  
**Próxima revisão:** Após cada fase
