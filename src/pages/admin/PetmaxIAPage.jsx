import { useState } from 'react'

const systemPrompt = `Você é o assistente virtual Petmax, especializado em gestão empresarial, questões fiscais, trabalhistas e consultoria no Brasil.

Sua expertise inclui:
- ERP e CRM: implementação, melhores práticas
- Contabilidade: impostos (ICMS, ISS, PIS, COFINS, IRPJ, CSLL), obrigações acessórias
- Direito trabalhista: CLT, contratos, rescisão, folha de pagamento
- Gestão financeira: fluxo de caixa, análise de resultados, investimentos
- Comercial: vendas, CRM, pipeline, Customer Success
- Consultoria empresarial: processos, produtividade, estratégia

Instruções:
- Responda sempre em português brasileiro
- Seja claro, objetivo e profissional
- Quando apropriado, cite artigos de lei ou normas
- Se não souber a resposta, seja honesto e sugira consultar um profissional
- Mantenha um tom友好 mas profissional
- Use formatação clara (listas, negrito quando necessário)`

export default function PetmaxIAPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou o assistente Petmax IA. Estou aqui para ajudar você com dúvidas sobre gestão empresarial, questões fiscais, trabalhistas, contabilidade e consultoria. Como posso ajudar você hoje?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const apiKey = import.meta.env.VITE_MINIMAX_API_KEY
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Configure a chave da API Minimax no arquivo .env.local para usar o assistente de IA. keys: VITE_MINIMAX_API_KEY' }])
        return
      }

      const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'abab6.5s-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, houve um erro ao processar sua solicitação. Tente novamente.' }])
      }
    } catch (error) {
      console.error('Erro na API:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, houve um erro ao conectar com a IA. Verifique a configuração da API e tente novamente.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([
      { role: 'assistant', content: 'Olá! Sou o assistente Petmax IA. Estou aqui para ajudar você com dúvidas sobre gestão empresarial, questões fiscais, trabalhistas, contabilidade e consultoria. Como posso ajudar você hoje?' }
    ])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Petmax IA</h2>
        <button onClick={handleClear} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Limpar Chat
        </button>
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
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: msg.role === 'user' ? '#6366f1' : '#f3f4f6',
              color: msg.role === 'user' ? 'white' : '#374151',
              whiteSpace: 'pre-wrap'
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
              color: '#6b7280'
            }}>
              Processando...
            </div>
          </div>
        )}
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
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{ 
            padding: '14px 24px',
            backgroundColor: loading || !input.trim() ? '#9ca3af' : '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}><strong>💡 Exemplos de perguntas:</strong></p>
        <ul style={{ fontSize: '0.875rem', color: '#6b7280', paddingLeft: '20px' }}>
          <li>Como calcular ICMS interesse?</li>
          <li>Quais são as obrigações acessórias do Simples Nacional?</li>
          <li>Como fazer uma rescisão trabalhista?</li>
          <li>Melhor práticas para gestão de现金流?</li>
        </ul>
      </div>
    </div>
  )
}