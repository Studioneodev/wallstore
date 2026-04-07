import { supabase } from './supabaseClient'

const MINIMAX_API_KEY = import.meta.env.VITE_MINIMAX_API_KEY
const MINIMAX_MODEL = import.meta.env.VITE_MINIMAX_MODEL || 'abab6.5s-chat'
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1'

const SYSTEM_PROMPT = `Você é o Petmax AI, assistente virtual inteligente do sistema ERP+CRM Petmax. 
Seu objetivo é ajudar usuários com dúvidas sobre gestão empresarial, questões fiscais, financeiras e operacionais.

Você deve:
-Responder de forma clara e profissional
-Fornecer sugestões baseadas em dados quando possível
-Ajudar com análises financeiras simples
-Explicar conceitos fiscais de forma acessível
-Oferecer dicas de produtividade

Contexto do sistema Petmax:
-ERP completo com gestão de empresas, tarefas e projetos
-CRM com pipeline de vendas
-Módulo financeiro com receitas e despesas
-Sistema de calendário e alertas

Sempre seja útil, objetivo e friendly.`

export const petmaxAIService = {
  async sendMessage(message, context = {}) {
    try {
      const response = await fetch(`${MINIMAX_BASE_URL}/text/chatcompletion_v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MINIMAX_API_KEY}`
        },
        body: JSON.stringify({
          model: MINIMAX_MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro na API da Minimax')
      }

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content
      }
      
      return 'Desculpe, não consegui processar sua solicitação. Tente novamente.'
    } catch (error) {
      console.error('Erro ao chamar API Minimax:', error)
      throw error
    }
  },

  async getSuggestions() {
    const suggestions = [
      'Quais são as tarefas mais importantes hoje?',
      'Me dá um resumo das finanças do mês?',
      'Quantos leads temos no pipeline?',
      'Quando é o próximo evento no calendário?',
      'Dicas para melhorar vendas'
    ]
    return suggestions
  },

  async analyzeData(type) {
    try {
      let analysis = ''
      
      switch (type) {
        case 'financeiro':
          const { data: receitas } = await supabase.from('receitas').select('amount, date')
          const { data: despesas } = await supabase.from('despesas').select('amount, date')
          
          const totalReceitas = receitas?.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0) || 0
          const totalDespesas = despesas?.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0) || 0
          const saldo = totalReceitas - totalDespesas
          
          analysis = `Resumo Financeiro:
- Receitas: R$ ${totalReceitas.toFixed(2)}
- Despesas: R$ ${totalDespesas.toFixed(2)}
- Saldo: R$ ${saldo.toFixed(2)}
- Margem: ${totalReceitas > 0 ? ((saldo / totalReceitas) * 100).toFixed(1) : 0}%`
          break
          
        case 'tarefas':
          const { data: tarefas } = await supabase.from('tasks').select('status, priority')
          const pendentes = tarefas?.filter(t => t.status === 'pendente').length || 0
          const concluidas = tarefas?.filter(t => t.status === 'concluida').length || 0
          const emProgresso = tarefas?.filter(t => t.status === 'em_progresso').length || 0
          
          analysis = `Resumo de Tarefas:
- Pendentes: ${pendentes}
- Em Progresso: ${emProgresso}
- Concluídas: ${concluidas}
- Total: ${tarefas?.length || 0}`
          break
          
        case 'crm':
          const { data: contatos } = await supabase.from('contacts').select('status, pipeline_stage')
          const leads = contatos?.filter(c => c.status === 'lead').length || 0
          const clientes = contatos?.filter(c => c.status === 'cliente').length || 0
          const ganhos = contatos?.filter(c => c.pipeline_stage === 'ganho').length || 0
          
          analysis = `Resumo CRM:
- Leads: ${leads}
- Clientes: ${clientes}
- Oportunidades Ganhas: ${ganhos}
- Taxa de Conversão: ${leads > 0 ? ((ganhos / leads) * 100).toFixed(1) : 0}%`
          break
          
        default:
          analysis = 'Tipo de análise não reconhecido.'
      }
      
      return analysis
    } catch (error) {
      console.error('Erro ao analisar dados:', error)
      return 'Erro ao buscar dados. Verifique a conexão.'
    }
  }
}
