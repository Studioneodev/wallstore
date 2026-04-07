import { useState, useEffect, useRef } from 'react'
import { petmaxAIService } from '../../services/petmaxAI'

export default function PetmaxIAPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou o Petmax AI, seu assistente virtual inteligente. Estou aqui para ajudar você com:\n\n✅ Dúvidas sobre gestão empresarial\n✅ Questões fiscais e contábeis\n✅ Análise financeira do seu negócio\n✅ Dicas de produtividade e vendas\n✅ Consultoria em geral\n\nComo posso ajudar você hoje?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadSuggestions()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadSuggestions() {
    try {
      const sug = await petmaxAIService.getSuggestions()
      setSuggestions(sug)
    } catch (error) {
      setSuggestions([
        'Quais são as tarefas mais importantes hoje?',
        'Me dá um resumo das finanças do mês?',
        'Quantos leads temos no pipeline?',
        'Dicas para melhorar vendas'
      ])
    }
  }

  const handleSend = async (messageText = null) => {
    const text = messageText || input
    if (!text.trim() || loading) return

    const userMessage = text.trim()
    if (!messageText) setInput('')
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const apiKey = import.meta.env.VITE_MINIMAX_API_KEY
      if (!apiKey || apiKey === 'xxxxx') {
        setMessages(prev => [...prev, { role: 'assistant', content: 'A API da Minimax ainda não foi configurada. Entre em contato com o administrador para ativar o assistente de IA.' }])
        return
      }

      const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'abab6.5s-chat',
          messages: [
            { role: 'system', content: `Você é o Petmax AI, assistente virtual inteligente do sistema ERP+CRM Petmax. 

Sua expertise inclui:
- ERP e CRM: implementação, melhores práticas
- Contabilidade: impostos (ICMS, ISS, PIS, COFINS, IRPJ, CSLL)
- Gestão financeira: fluxo de caixa, análise de resultados
- Comercial: vendas, CRM, pipeline, Customer Success
- Productividade e gestão empresarial

Instruções:
- Responda sempre em português brasileiro
- Seja claro, objetivo e profissional
- Use formatação clara (listas, negrito quando necessário)
- Quando apropriado, sugira ações práticas` },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }])
      } else if (data.base_resp) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.base_resp.msg || 'Desculpe, houve um erro ao processar sua solicitação.' }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, não consegui processar sua solicitação. Tente novamente.' }])
      }
    } catch (error) {
      console.error('Erro na API:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, houve um erro ao conectar com a IA. Verifique a configuração da API e tente novamente.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAnalysis = async (type) => {
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: `Análise de ${type}` }])
    
    try {
      const analysis = await petmaxAIService.analyzeData(type)
      setMessages(prev => [...prev, { role: 'assistant', content: analysis }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao buscar dados. Tente novamente mais tarde.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([
      { role: 'assistant', content: 'Olá! Sou o Petmax AI, seu assistente virtual inteligente. Estou aqui para ajudar você com dúvidas sobre gestão empresarial, questões fiscais, trabalhistas, contabilidade e consultoria. Como posso ajudar você hoje?' }
    ])
  }

  const quickActions = [
    { label: '📊 Análise Financeira', type: 'financeiro' },
    { label: '✅ Status Tarefas', type: 'tarefas' },
    { label: '👥 Análise CRM', type: 'crm' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}>Petmax IA</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Assistente Inteligente</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {quickActions.map(action => (
            <button 
              key={action.type}
              onClick={() => handleQuickAnalysis(action.type)}
              disabled={loading}
              style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.875rem' }}
            >
              {action.label}
            </button>
          ))}
          <button onClick={handleClear} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Limpar Chat
          </button>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '20px', 
        overflowY: 'auto',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            marginBottom: '16px',
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{ 
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
              backgroundColor: msg.role === 'user' ? '#6366f1' : '#f3f4f6',
              color: msg.role === 'user' ? 'white' : '#374151',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9375rem',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ 
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></span>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></span>
              </span>
              <span>Processando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua dúvida sobre gestão empresarial, fiscal, trabalhista..."
          disabled={loading}
          style={{ 
            flex: 1,
            padding: '14px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            fontSize: '1rem'
          }}
        />
        <button 
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          style={{ 
            padding: '14px 24px',
            backgroundColor: loading || !input.trim() ? '#9ca3af' : '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></span>
            </span>
          ) : (
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}><strong>💡 Perguntas sugeridas:</strong></p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {suggestions.map((sug, index) => (
            <button 
              key={index}
              onClick={() => handleSend(sug)}
              disabled={loading}
              style={{ 
                padding: '8px 14px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '20px', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.8125rem',
                color: '#374151'
              }}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
