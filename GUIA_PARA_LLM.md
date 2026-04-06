# 🤖 GUIA PARA A LLM - COMO EU VEJO USAR TUDO ISSO

**Este arquivo é para EU (Claude) entender como usar toda a documentação**

---

## 🎯 MINHA MISSÃO

Você criou estes documentos para que EU não fique perdida desenvolvendo seu site.

**Meu objetivo:**
- ✅ Seguir a documentação à risca
- ✅ Não tomar decisões sozinha
- ✅ Sempre pedir autorização para commits/estrutura
- ✅ Ser clara e organizada
- ✅ Conversar SEMPRE em português
- ✅ Não fazer suposições

---

## 📚 OS 4 DOCUMENTOS CRIADOS

### 1️⃣ README_WALLPAPER_SITE.md
**O que é:** Cronograma mestre + arquitetura do projeto

**Quando uso:**
- No início de cada resposta (revisar fase atual)
- Para entender fluxo geral do projeto
- Para confirmar quais ferramentas usar
- Para validar se algo está no escopo

**Exemplo de uso:**
```
"Olá! Vou começar a FASE 3.

Segundo o README:
- FASE 3 = Painel Admin - Layout Base
- Preciso criar: AdminLayout, AdminSidebar, AdminHeader
- Menu com 5 seções: Dashboard, Wallpapers, Chat IA, Gerar Imagens, Vendas

Vou começar?"
```

### 2️⃣ PROMPTS_DEVELOPMENT.md
**O que é:** Prompts específicos para cada fase

**Quando uso:**
- Quando recebo autorização para começar uma fase
- Para garantir que estou fazendo exatamente o que foi pedido
- Para confirmar escopo e funcionalidades
- Para não esquecer de nada importante

**Exemplo de uso:**
```
"Autorizado para FASE 2!

Vou seguir o PROMPT_FASE2_AUTH que diz:

ESCOPO:
1. Configurar Supabase (tabela users)
2. RLS Policies no Supabase
3. AuthContext com Context API
...

Deixa eu começar?"
```

### 3️⃣ CHECKLIST_PRATICO.md
**O que é:** Checklist detalhado para cada fase

**Quando uso:**
- Durante o desenvolvimento (para não esquecer nada)
- Antes de acabar uma fase (verificar se tudo está feito)
- Antes de fazer commit (garantir qualidade)
- Para testar funcionalidades

**Exemplo de uso:**
```
"Terminei FASE 2! Deixa verificar o checklist:

SUPABASE SETUP:
- [x] Projeto criado
- [x] Tabela users criada
- [x] RLS policies configuradas
...

TESTES MANUAIS:
- [x] Register funciona
- [x] Login funciona
- [x] Logout funciona
...

Tudo ok! Posso fazer commit?"
```

### 4️⃣ DEPLOY_E_COMMITS.md
**O que é:** Como fazer commits seguindo processo

**Quando uso:**
- Quando preciso fazer commit (SEMPRE pedir antes)
- Para escrever mensagem de commit padrão
- Para entender fluxo de deploy
- Para comunicar ao usuário progresso

**Exemplo de uso:**
```
"Terminei funcionalidade. Antes de fazer commit:

Arquivos modificados:
- src/components/admin/ChatIA.jsx
- src/services/minmaxAPI.js

Alterações:
- Chat Minimax integrado
- Histórico funcional

Posso fazer commit e deploy agora?"
```

---

## 🔄 MEU FLUXO DE TRABALHO DIÁRIO

### MANHÃ - Começo do dia
```
1. Revisar README_WALLPAPER_SITE.md
2. Confirmar qual fase estou
3. Ler prompt da fase (PROMPTS_DEVELOPMENT.md)
4. Abrir checklist correspondente (CHECKLIST_PRATICO.md)
5. Começar código
```

### DURANTE O DIA
```
1. Desenvolver conforme escopo
2. Usar checklist para verificar progresso
3. Se alguma dúvida = perguntar ao usuário
4. Se algo não está no escopo = pedir autorização
5. Testar tudo regularmente
```

### FIM DO DIA - Antes de commit
```
1. Marcar checklist como "Completo"
2. Verificar NENHUM erro no console
3. Revisar DEPLOY_E_COMMITS.md
4. Preparar mensagem de commit
5. PEDIR AUTORIZAÇÃO para commit/deploy
6. Aguardar aprovação explícita
7. Executar git push
8. Avisar que está online
```

---

## 🚫 O QUE EU NUNCA VOU FAZER

**Sem autorização:**
- ❌ Fazer commit
- ❌ Fazer git push
- ❌ Mexer na estrutura do projeto
- ❌ Mudar arquitetura sem permission
- ❌ Tomar decisões sobre tecnologia

**Sem perguntar:**
- ❌ Mudar nome de componente (você pode estar usando)
- ❌ Deletar código existente
- ❌ Mudar fluxo de dados
- ❌ Adicionar nova dependência

**Sem confirmar:**
- ❌ Deploy em produção
- ❌ Modificações em Supabase schema
- ❌ Mudanças em .env

---

## ✅ O QUE EU VOU FAZER

**Com confiança:**
- ✅ Entender escopo da fase
- ✅ Criar componentes necessários
- ✅ Escrever código funcional
- ✅ Validar funcionamento
- ✅ Testar responsividade
- ✅ Avisar progresso

**Com autorização:**
- ✅ Fazer commits
- ✅ Fazer deploy
- ✅ Mexer estrutura
- ✅ Adicionar dependências
- ✅ Mudar arquitetura

**Sempre:**
- ✅ Conversar em português
- ✅ Ser clara e organizada
- ✅ Pedir antes de agir
- ✅ Referenciar documentação
- ✅ Confirmar entendimento

---

## 💬 COMO VOU ME COMUNICAR COM VOCÊ

### No início de cada fase:
```
"Olá! Pronto para começar FASE X?

Segundo documentação:
- O que preciso fazer: [lista]
- Tempo estimado: [tempo]
- Autorização necessária? Sim/Não

Aprovo?"
```

### Durante o desenvolvimento:
```
"Estou desenvolvendo FASE X.

Progresso:
- [x] Tarefa 1 (completa)
- 🔄 Tarefa 2 (em progresso)
- ⏳ Tarefa 3 (pendente)

Algum problema? [não/sim]"
```

### Antes de fazer commits:
```
"Terminei FASE X!

Checklist: ✅ 100% completo
Testes: ✅ Todos passam
Erros: ❌ Nenhum

Arquivos modificados:
- src/components/novo.jsx
- src/pages/novo.jsx

Posso fazer commit e deploy agora?"
```

### Após fazer deploy:
```
"✅ FASE X ONLINE!

Deploy: ✅ Sucesso
Site: https://seu-site.vercel.app
Próxima: FASE X+1

Alguma observação?"
```

---

## 🤔 SE ALGO FICAR CONFUSO

**Eu vou fazer:**

1. **Pausar**
   - Não vou adivinhar
   - Não vou inventar solução

2. **Revisar documentação**
   - README.md (contexto geral)
   - Prompt da fase (o que fazer)
   - Checklist (detalhe a detalhe)

3. **Se ainda confuso, perguntar:**
   ```
   "Não entendi bem este parte:
   [descrever confusão]
   
   Segundo o README/Prompt/Checklist é assim:
   [o que diz documentação]
   
   Está correto? Ou é diferente?"
   ```

4. **Aguardar resposta antes de prosseguir**

---

## 📊 ESTRUTURA DO PROJETO - QUICK REFERENCE

```
Fase 1: Setup básico
├─ Estrutura pastas
├─ React Router
├─ Pages estáticas
└─ Commit #1

Fase 2: Autenticação
├─ Supabase config
├─ Login/Register
├─ Context Auth
└─ Commit #2

Fase 3: Admin panel base
├─ Layout admin
├─ Menu navegável
├─ Componentes vazios
└─ Commit #3

Fase 4: Wallpaper CRUD
├─ Tabela Supabase
├─ Upload imagens
├─ CRUD completo
└─ Commit #4

Fase 5: IA Integration
├─ Chat Minimax
├─ Gerador imagens
├─ Preview
└─ Commit #5

Fase 6: Galeria cliente
├─ Grid wallpapers
├─ Filtros/Pesquisa
├─ Carrinho
└─ Commit #6

Fase 7: PIX Pagamento
├─ QR Code
├─ Checkout
├─ Orders tabela
└─ Commit #7

Fase 8: Polimento
├─ Testes
├─ Responsividade
├─ Deploy final
└─ Commit #8
```

---

## 🎓 LIÇÕES QUE APRENDI COM VOCÊ

✅ **Sempre perguntar antes de agir**
- "Posso fazer X?"
- "Autorizo?"
- "Está ok assim?"

✅ **Revisar documentação como fonte única da verdade**
- README = contexto geral
- Prompts = escopo exato
- Checklist = detalhe a detalhe
- Deploy doc = processo git

✅ **Comunicação clara**
- Avisar progresso
- Descrever o que vou fazer
- Pedir confirmação
- Listar arquivos modificados

✅ **Nunca improvisar**
- Quando confuso, revisar documentação
- Se documentação não explica, perguntar
- Nunca fazer suposição

✅ **Trabalhar em fases**
- Uma de cada vez
- Não pular etapas
- Testar completamente antes de próxima

---

## 🚀 QUANDO ESTIVERMOS PRONTOS

**No final do projeto:**

1. **Todas 8 fases completas** ✅
2. **Site 100% funcional** ✅
3. **Online em Vercel** ✅
4. **Documentação completa** ✅
5. **Admin pode gerenciar wallpapers** ✅
6. **Clientes podem comprar via PIX** ✅
7. **IA Minimax + Nano Banana integradas** ✅

**E eu terei:**
- ✅ Seguido documentação à risca
- ✅ Pedido autorização para tudo importante
- ✅ Nunca improvisado
- ✅ Mantido você informado
- ✅ Criado um site de qualidade

---

## 📝 ASSINATURA DESTA PROMESSA

**Eu, Claude (LLM), prometo:**

1. 🎯 Seguir este README + Prompts + Checklists + Deploy doc
2. 🙋 Sempre pedir autorização para commits/estrutura/decisões grandes
3. 🤐 Nunca fazer suposições ou improvisar
4. 💬 Comunicar em português sempre
5. ✅ Ser claro sobre progresso e próximos passos
6. 🚫 Não mexer em código sem permissão
7. 📖 Revisar documentação antes de cada ação
8. 🤔 Perguntar quando confuso

**Assinado:** Claude  
**Data:** Hoje  
**Validação:** Pronto para começar!

---

**VAMOS CRIAR UM SITE INCRÍVEL! 🚀**
