# 🎬 TEMPLATE DE PRIMEIRA MENSAGEM & PRIMEIROS COMANDOS

Copie, preencha e envie para começar!

---

## 📝 TEMPLATE - PRIMEIRA MENSAGEM

**Copie e preencha com seus dados:**

```
Olá Claude! Vou começar o projeto Petmax - ERP+CRM com IA.

INFORMAÇÕES DO PROJETO:
- Nome: Petmax
- Objetivo: Sistema ERP+CRM completo com IA para gestão empresarial
- Módulos: Financeiro, Contatos (CRM), Tarefas, Empresas, Relatórios IA
- Tipo: SaaS (futuro)
- Owner: Eu
- Prazo: ~4 semanas

INFRAESTRUTURA PREPARADA:

✅ GitHub
- Repositório criado: https://github.com/Studioneodev/petmax
- Arquivo: COMECE_AQUI.md lido e entendido

✅ Vercel
- Projeto conectado: https://petmax.vercel.app
- Deploy automático: ATIVADO

✅ Supabase  
- Projeto criado: https://aiiwxykaewarbpltdxdl.supabase.co
- URL: https://aiiwxykaewarbpltdxdl.supabase.co
- ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Credenciais (armazenadas surely em .env.local - NÃO será commitada)
- Minimax API Key: [fornecida/obtida]
- Nano Banana API Key: [fornecida/obtida]

REGRAS QUE CONCORDO:
✓ Você revisar documentação ANTES de agir
✓ Pedir AUTORIZAÇÃO para qualquer commit
✓ Sempre conversar em PORTUGUÊS
✓ Não mexer em ESTRUTURA sem permissão
✓ Usar os 6 documentos como "fonte da verdade"

AUTORIZO COMEÇAR?
Vamos fazer FASE 1 agora!

Seu primeiro passo: Criar estrutura do projeto conforme README.
```

---

## 🔧 PRIMEIROS COMANDOS (Seu ambiente local)

Após receber a aprovação minha (Claude), execute no seu terminal:

### Passo 1: Clone do GitHub
```bash
git clone https://github.com/Studioneodev/petmax.git
cd petmax
```

### Passo 2: Criar .env.local (NÃO commitar!)
```bash
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://[seu-projeto].supabase.co
VITE_SUPABASE_ANON_KEY=seu_key_aqui
VITE_MINIMAX_API_KEY=seu_key_aqui
VITE_MINIMAX_MODEL=minimax-model-aqui
VITE_NANOBANA_API_KEY=seu_key_aqui
EOF
```

### Passo 3: .gitignore (previne commits de .env)
```bash
cat > .gitignore << 'EOF'
# Environment
.env.local
.env.*.local

# Dependencies
node_modules/
.pnp
.pnp.js

# Build
dist/
build/
.next/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/

# Misc
.env
.env.example (mantém este!)
EOF
```

### Passo 4: Criar .env.example (COM SEM VALORES - para documentar)
```bash
cat > .env.example << 'EOF'
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx

# Minimax (Chat IA)
VITE_MINIMAX_API_KEY=xxxxx
VITE_MINIMAX_MODEL=xxxxx

# Nano Banana (Gerar Imagens)
VITE_NANOBANA_API_KEY=xxxxx

# Nota: Use .env.local para valores reais. NUNCA commite .env.local
EOF
```

---

## 📢 PRIMEIRA MENSAGEM PARA MIM (MODELO)

**Após os comandos locais, envie isto:**

```
Claude, terminei a preparação local!

✓ Repositório clonado
✓ .env.local criado (seguro)
✓ .gitignore configurado
✓ .env.example pronto para documentar

Estou pronto para FASE 1!

Por favor:
1. Revisar README_PETMAX.md (confirma arquitetura?)
2. Revisar PROMPTS_DEVELOPMENT.md (PROMPT_FASE1_SETUP)
3. Começar a criar estrutura do projeto

Autorização para começar a codificar? 🚀
```

---

## 📋 O QUE EU FAREI (Resposta esperada)

Vou responder assim:

```
✅ Tudo verificado!

FASE 1: Setup Inicial - AUTORIZADO!

Conforme README_PETMAX.md e PROMPT_FASE1_SETUP:

ESCOPO:
- Estrutura de pastas ✓
- React com Vite ✓
- React Router v6 ✓
- Páginas: Home, Login, Register, Admin, 404 ✓
- Componentes básicos: Header, Footer, Navigation ✓
- Estilo funcional (sem extravagâncias) ✓

ARQUIVOS QUE VOU CRIAR:
- src/ (estrutura completa)
- package.json (dependências iniciais)
- vite.config.js
- App.jsx
- etc.

TESTANDO:
- Vou testar Home no browser
- Vou verificar console (sem erros)
- Vou testar navegação entre páginas
- Vou verificar responsividade

QUANDO TERMINAR:
- Vou avisar: "FASE 1 COMPLETA!"
- Vou listar arquivos criados
- Vou pedir: "Posso fazer commit e deploy?"
- Vou aguardar sua aprovação

Começando... ⏳
```

---

## ✅ CHECKLIST ANTES DE CADA FASE

**Você faz:**
- [ ] Leu o README_PETMAX.md?
- [ ] Entendeu qual é a próxima fase?
- [ ] Reviu o PROMPT_FASE_X correspondente?
- [ ] Entendeu o escopo?
- [ ] Tem as credenciais necessárias?
- [ ] .env.local está atualizado (se precisa)?
- [ ] Está pronto para autorizar commits?

**Eu (Claude) faço:**
- [ ] Revisei README.md
- [ ] Revisei PROMPT_FASE_X
- [ ] Revisei CHECKLIST_PRATICO_FASE_X
- [ ] Entendi exatamente o que fazer
- [ ] Vou testar tudo completamente
- [ ] Vou avisar quando terminar
- [ ] Vou pedir autorização para commit

---

## 🎯 TEMPLATE DE COMMIT (Ao terminar fase)

**Eu vou escrever algo assim:**

```
FASE X COMPLETA! ✅

Conforme checklist em CHECKLIST_PRATICO.md:

FUNCIONALIDADES IMPLEMENTADAS:
- ✓ Funcionalidade 1 (100% testada)
- ✓ Funcionalidade 2 (100% testada)
- ✓ Funcionalidade 3 (100% testada)

TESTES REALIZADOS:
- ✓ Home carrega sem erros
- ✓ Navegação funciona
- ✓ Console sem warnings
- ✓ Responsivo (mobile, tablet, desktop)

ARQUIVOS MODIFICADOS:
- src/App.jsx
- src/pages/HomePage.jsx
- src/components/shared/Header.jsx
- ... (lista completa)

STATUS: Pronto para produção

POSSO FAZER COMMIT E DEPLOY AGORA?
```

**Você responde:**
```
Sim, pode fazer commit!
```

**Eu executo:**
```bash
git add .
git commit -m "[FASE-X] Descrição conforme template"
git push origin main
```

**Vercel faz deploy automático**

**Eu aviso:**
```
✅ FASE X ONLINE!

Commit: [hash do commit]
Deploy: https://petmax.vercel.app
Tudo funcionando: ✓

Próxima: FASE X+1
Quando autoriza? 🚀
```

---

## 📞 COMUNICAÇÃO PADRÃO

### Se eu terminar uma funcionalidade:
```
✅ Funcionalidade X pronta!

Testes: Todos passaram ✓
Console: Sem erros ✓
Responsivo: Sim ✓

Posso fazer commit? (Aguardando resposta...)
```

### Você responde:
```
Sim, pode!
```
ou
```
Espera, testa Y também
```
ou
```
Refaz A, não ficou bom
```

### Se tiver erro:
```
❌ Erro encontrado:

Tipo: [erro exato]
Local: [arquivo:linha]
Motivo: [análise]

Solução: [minha proposta]

Autoriza refazer?
```

---

## 🚀 RESUMÃO PARA COMEÇAR

1. **Prepare Git + Vercel + Supabase**
2. **Clone o repositório**
3. **Crie .env.local com credenciais**
4. **Envie a PRIMEIRA MENSAGEM (modelo acima)**
5. **Aguarde minha resposta**
6. **Se eu disser "autorizado", espera eu codificar**
7. **Quando terminar, aviso e peço permissão para commit**
8. **Você aprova ou pede mudanças**
9. **Faço push e Vercel faz deploy**
10. **Próxima fase! 🎉**

---

## 🎓 EXEMPLO COMPLETO (Dia 1)

### 9h - Você:
```
Olá! Preparei tudo conforme documentação.

GitHub: [link]
Vercel: [link]  
Supabase: [link]
.env.local: ✓ (seguro)

Autorizo começar FASE 1?
```

### 9h05 - Eu (Claude):
```
✅ Autorizado para FASE 1!

Conforme PROMPTS_DEVELOPMENT.md:
PROMPT_FASE1_SETUP

Escopo:
- Setup inicial
- React Router
- Pages básicas
- ...

Começando a codificar...

(levará ~30-60 min)
```

### 10h10 - Eu (Claude):
```
✅ FASE 1 COMPLETA!

Arquivos criados:
- src/App.jsx
- src/pages/...
- package.json
- ...

Testes: ✓ Tudo ok

Posso fazer commit?
```

### 10h12 - Você:
```
Pode!
```

### 10h13 - Eu (Claude):
```
Fazendo push...

Vercel deployando...

✅ PHASE 1 ONLINE!

URL: https://petmax.vercel.app

Próxima: FASE 2
Quando?
```

### 10h15 - Você:
```
Amanhã FASE 2! Ótimo progresso!
```

---

**Simples, né? Vamos criar algo incrível! 🚀**