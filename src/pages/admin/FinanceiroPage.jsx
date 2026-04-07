import { useState, useEffect } from 'react'
import { financeiroService } from '../../services/financeiroService'

export default function FinanceiroPage() {
  const [resumo, setResumo] = useState({ totalReceitas: 0, totalDespesas: 0, saldo: 0, receitasPendentes: 0, despesasPendentes: 0 })
  const [receitas, setReceitas] = useState([])
  const [despesas, setDespesas] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumo')
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('receita')
  const [form, setForm] = useState({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], source: '', supplier: '', notes: '' })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [resumoData, receitasData, despesasData] = await Promise.all([
        financeiroService.getResumo().catch(() => ({ totalReceitas: 0, totalDespesas: 0, saldo: 0, receitasPendentes: 0, despesasPendentes: 0 })),
        financeiroService.getReceitas().catch(() => []),
        financeiroService.getDespesas().catch(() => [])
      ])
      setResumo(resumoData)
      setReceitas(receitasData || [])
      setDespesas(despesasData || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = { ...form, amount: parseFloat(form.amount), received: true, paid: true }
      if (formType === 'receita') {
        await financeiroService.createReceita(data)
      } else {
        await financeiroService.createDespesa(data)
      }
      setShowForm(false)
      setForm({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], source: '', supplier: '', notes: '' })
      loadData()
    } catch (error) {
      alert('Erro ao salvar')
    }
  }

  async function handleDelete(id, type) {
    if (confirm('Tem certeza?')) {
      try {
        if (type === 'receita') {
          await financeiroService.deleteReceita(id)
        } else {
          await financeiroService.deleteDespesa(id)
        }
        loadData()
      } catch (error) {
        alert('Erro ao deletar')
      }
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0)
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Financeiro</h2>
        <button onClick={() => { setShowForm(!showForm) }} style={{ backgroundColor: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          + Nova Movimentação
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button onClick={() => setFormType('receita')} style={{ padding: '8px 16px', backgroundColor: formType === 'receita' ? '#10b981' : '#e5e7eb', color: formType === 'receita' ? 'white' : '#374151', border: 'none', borderRadius: '6px' }}>Receita</button>
            <button onClick={() => setFormType('despesa')} style={{ padding: '8px 16px', backgroundColor: formType === 'despesa' ? '#ef4444' : '#e5e7eb', color: formType === 'despesa' ? 'white' : '#374151', border: 'none', borderRadius: '6px' }}>Despesa</button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Descrição" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="number" placeholder="Valor" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <option value="">Selecione a categoria</option>
              {formType === 'receita' ? (
                <>
                  <option value="vendas">Vendas</option>
                  <option value="servicos">Serviços</option>
                  <option value="investimentos">Investimentos</option>
                  <option value="outros">Outros</option>
                </>
              ) : (
                <>
                  <option value="operacional">Operacional</option>
                  <option value="marketing">Marketing</option>
                  <option value="admin">Administrativo</option>
                  <option value="folha">Folha de Pagamento</option>
                  <option value="aluguel">Aluguel</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="outros">Outros</option>
                </>
              )}
            </select>
            <input type="text" placeholder={formType === 'receita' ? 'Origem' : 'Fornecedor'} value={formType === 'receita' ? form.source : form.supplier} onChange={e => setForm(formType === 'receita' ? {...form, source: e.target.value} : {...form, supplier: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: formType === 'receita' ? '#10b981' : '#ef4444', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar {formType === 'receita' ? 'Receita' : 'Despesa'}
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Receitas</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>{formatCurrency(resumo.totalReceitas)}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Despesas</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>{formatCurrency(resumo.totalDespesas)}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Receitas Pendentes</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{formatCurrency(resumo.receitasPendentes)}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Despesas Pendentes</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>{formatCurrency(resumo.despesasPendentes)}</p>
        </div>
      </div>

      <div style={{ backgroundColor: resumo.saldo >= 0 ? '#d1fae5' : '#fee2e2', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
        <p style={{ fontSize: '1rem', color: '#374151' }}>Saldo Atual: <strong style={{ fontSize: '1.5rem', color: resumo.saldo >= 0 ? '#065f46' : '#991b1b' }}>{formatCurrency(resumo.saldo)}</strong></p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => setActiveTab('receitas')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'receitas' ? '#10b981' : '#e5e7eb', color: activeTab === 'receitas' ? 'white' : '#374151', border: 'none', borderRadius: '8px' }}>Receitas ({receitas.length})</button>
        <button onClick={() => setActiveTab('despesas')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'despesas' ? '#ef4444' : '#e5e7eb', color: activeTab === 'despesas' ? 'white' : '#374151', border: 'none', borderRadius: '8px' }}>Despesas ({despesas.length})</button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Descrição</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Categoria</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Data</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Valor</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'receitas' ? receitas : despesas).map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{item.description}</td>
                <td style={{ padding: '12px' }}>{item.category || '-'}</td>
                <td style={{ padding: '12px' }}>{item.date ? new Date(item.date).toLocaleDateString('pt-BR') : '-'}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: activeTab === 'receitas' ? '#10b981' : '#ef4444' }}>{formatCurrency(item.amount)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(item.id, activeTab === 'receitas' ? 'receita' : 'despesa')} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Deletar</button>
                </td>
              </tr>
            ))}
            {(activeTab === 'receitas' ? receitas : despesas).length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Nenhuma movimentação encontrada</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}