import { useState, useEffect } from 'react'
import { financeiroService } from '../../services/financeiroService'
import { companyService } from '../../services/companyService'

export default function FinanceiroPage() {
  const [resumo, setResumo] = useState({ totalReceitas: 0, totalDespesas: 0, saldo: 0, receitasPendentes: 0, despesasPendentes: 0 })
  const [receitas, setReceitas] = useState([])
  const [despesas, setDespesas] = useState([])
  const [contasPagar, setContasPagar] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('lancamentos')
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('receita')
  const [form, setForm] = useState({ 
    description: '', 
    amount: '', 
    category: '', 
    date: new Date().toISOString().split('T')[0], 
    dueDate: new Date().toISOString().split('T')[0],
    source: '', 
    supplier: '', 
    notes: '', 
    company_id: '',
    paid: false,
    received: false
  })
  const [fluxoMensal, setFluxoMensal] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const currentYear = new Date().getFullYear()
      const [resumoData, receitasData, despesasData, empresasData, fluxoData] = await Promise.all([
        financeiroService.getResumo().catch(() => ({ totalReceitas: 0, totalDespesas: 0, saldo: 0, receitasPendentes: 0, despesasPendentes: 0 })),
        financeiroService.getReceitas().catch(() => []),
        financeiroService.getDespesas().catch(() => []),
        companyService.getAll().catch(() => []),
        financeiroService.getFluxoMensal(currentYear).catch(() => [])
      ])
      setResumo(resumoData)
      setReceitas(receitasData || [])
      setDespesas(despesasData || [])
      setEmpresas(empresasData || [])
      setFluxoMensal(fluxoData || [])
      
      const pendentes = despesasData?.filter(d => !d.paid) || []
      setContasPagar(pendentes)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = { 
        ...form, 
        amount: parseFloat(form.amount), 
        received: formType === 'receita' ? form.received : false,
        paid: formType === 'despesa' ? form.paid : false,
        source: formType === 'receita' ? form.source : null,
        supplier: formType === 'despesa' ? form.supplier : null
      }
      if (formType === 'receita') {
        await financeiroService.createReceita(data)
      } else {
        await financeiroService.createDespesa(data)
      }
      setShowForm(false)
      setForm({ 
        description: '', amount: '', category: '', 
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        source: '', supplier: '', notes: '', company_id: '',
        paid: false, received: false
      })
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

  async function handleMarcarPago(id) {
    try {
      await financeiroService.updateDespesa(id, { paid: true })
      loadData()
    } catch (error) {
      alert('Erro ao atualizar')
    }
  }

  async function handleMarcarRecebido(id) {
    try {
      await financeiroService.updateReceita(id, { received: true })
      loadData()
    } catch (error) {
      alert('Erro ao atualizar')
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0)
  }

  const allLancamentos = [
    ...receitas.map(r => ({ ...r, type: 'receita' })),
    ...despesas.map(d => ({ ...d, type: 'despesa' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  const tabs = [
    { id: 'lancamentos', label: 'Lançamentos', icon: '📋' },
    { id: 'contasPagar', label: 'Contas a Pagar', icon: '💸' },
    { id: 'fluxoCaixa', label: 'Fluxo de Caixa', icon: '📊' },
  ]

  const cards = [
    { 
      label: 'Receitas', 
      value: resumo.totalReceitas, 
      icon: '📈', 
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      border: '#10b981'
    },
    { 
      label: 'Despesas', 
      value: resumo.totalDespesas, 
      icon: '📉', 
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      border: '#ef4444'
    },
    { 
      label: 'Saldo', 
      value: resumo.saldo, 
      icon: '💰', 
      color: resumo.saldo >= 0 ? '#10b981' : '#ef4444',
      bg: resumo.saldo >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
      border: resumo.saldo >= 0 ? '#10b981' : '#ef4444'
    },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', height: '48px', 
            border: '3px solid rgba(99, 102, 241, 0.2)', 
            borderTopColor: '#6366f1', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', 
            margin: '0 auto 16px' 
          }}></div>
          <p style={{ color: '#9ca3af' }}>Carregando financeiro...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f9fafb' }}>Financeiro</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '4px' }}>Gerencie suas finanças</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={{ 
            backgroundColor: '#6366f1', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          + Nova Movimentação
        </button>
      </div>

      {showForm && (
        <div style={{ 
          backgroundColor: '#1f2937', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '24px', 
          border: '1px solid #374151'
        }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button 
              onClick={() => setFormType('receita')} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: formType === 'receita' ? '#10b981' : '#374151', 
                color: formType === 'receita' ? 'white' : '#9ca3af', 
                border: 'none', 
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Receita
            </button>
            <button 
              onClick={() => setFormType('despesa')} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: formType === 'despesa' ? '#ef4444' : '#374151', 
                color: formType === 'despesa' ? 'white' : '#9ca3af', 
                border: 'none', 
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Despesa
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input 
              type="text" 
              placeholder="Descrição *" 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              required 
              style={{ gridColumn: 'span 2', padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }} 
            />
            <input 
              type="number" 
              placeholder="Valor *" 
              value={form.amount} 
              onChange={e => setForm({...form, amount: e.target.value})} 
              required 
              style={{ padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }} 
            />
            <input 
              type="date" 
              value={form.date} 
              onChange={e => setForm({...form, date: e.target.value})} 
              required 
              style={{ padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }} 
            />
            <select 
              value={form.category} 
              onChange={e => setForm({...form, category: e.target.value})} 
              style={{ padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }}
            >
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
            {formType === 'receita' ? (
              <input 
                type="text" 
                placeholder="Origem" 
                value={form.source} 
                onChange={e => setForm({...form, source: e.target.value})} 
                style={{ padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }} 
              />
            ) : (
              <input 
                type="text" 
                placeholder="Fornecedor" 
                value={form.supplier} 
                onChange={e => setForm({...form, supplier: e.target.value})} 
                style={{ padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }} 
              />
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
              <input 
                type="checkbox" 
                checked={form.received}
                onChange={e => setForm({...form, received: e.target.checked})}
              />
              Recebido
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
              <input 
                type="checkbox" 
                checked={form.paid}
                onChange={e => setForm({...form, paid: e.target.checked})}
              />
              Pago
            </label>
            <select 
              value={form.company_id} 
              onChange={e => setForm({...form, company_id: e.target.value})} 
              style={{ gridColumn: 'span 2', padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827', color: '#f9fafb' }}
            >
              <option value="">Selecione a Empresa (opcional)</option>
              {empresas.map(empresa => (
                <option key={empresa.id} value={empresa.id}>{empresa.name}</option>
              ))}
            </select>
            <button 
              type="submit" 
              style={{ 
                gridColumn: 'span 2', 
                backgroundColor: formType === 'receita' ? '#10b981' : '#ef4444', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '8px', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: '600' 
              }}
            >
              Salvar {formType === 'receita' ? 'Receita' : 'Despesa'}
            </button>
          </form>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px', 
        marginBottom: '24px'
      }}>
        {cards.map((card, index) => (
          <div 
            key={index} 
            style={{
              backgroundColor: card.bg,
              border: `2px solid ${card.border}`,
              padding: '24px',
              borderRadius: '16px',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: '500' }}>{card.label}</span>
              <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: card.color }}>
              {formatCurrency(card.value)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '12px', 
        padding: '16px',
        border: '1px solid #374151',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === tab.id ? '#6366f1' : '#111827',
                color: activeTab === tab.id ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'lancamentos' && (
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '12px', 
          padding: '24px', 
          border: '1px solid #374151'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#f9fafb' }}>
            Todos os Lançamentos ({allLancamentos.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Tipo</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Descrição</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Categoria</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Data</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Valor</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {allLancamentos.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem',
                      backgroundColor: item.type === 'receita' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: item.type === 'receita' ? '#10b981' : '#ef4444'
                    }}>
                      {item.type === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#e5e7eb' }}>{item.description}</td>
                  <td style={{ padding: '12px', color: '#9ca3af' }}>{item.category || '-'}</td>
                  <td style={{ padding: '12px', color: '#9ca3af' }}>{item.date ? new Date(item.date).toLocaleDateString('pt-BR') : '-'}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: item.type === 'receita' ? '#10b981' : '#ef4444' }}>
                    {formatCurrency(item.amount)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem',
                      backgroundColor: (item.type === 'receita' ? item.received : item.paid) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: (item.type === 'receita' ? item.received : item.paid) ? '#10b981' : '#f59e0b'
                    }}>
                      {(item.type === 'receita' ? item.received : item.paid) ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(item.id, item.type === 'receita' ? 'receita' : 'despesa')} 
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#ef4444', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
              {allLancamentos.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                    Nenhuma movimentação encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'contasPagar' && (
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '12px', 
          padding: '24px', 
          border: '1px solid #374151'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#f9fafb' }}>
            Contas a Pagar ({contasPagar.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Descrição</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Fornecedor</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Vencimento</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Valor</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af', fontSize: '0.85rem' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contasPagar.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px', color: '#e5e7eb' }}>{item.description}</td>
                  <td style={{ padding: '12px', color: '#9ca3af' }}>{item.supplier || '-'}</td>
                  <td style={{ padding: '12px', color: '#9ca3af' }}>{item.date ? new Date(item.date).toLocaleDateString('pt-BR') : '-'}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#ef4444' }}>
                    {formatCurrency(item.amount)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleMarcarPago(item.id)} 
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#10b981', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      ✓ Marcar Pago
                    </button>
                  </td>
                </tr>
              ))}
              {contasPagar.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                    Nenhuma conta a pagar pendente
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'fluxoCaixa' && (
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '12px', 
          padding: '24px', 
          border: '1px solid #374151'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#f9fafb' }}>
            Fluxo de Caixa Mensal {new Date().getFullYear()}
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {fluxoMensal.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 1fr 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}
              >
                <span style={{ color: '#e5e7eb', fontWeight: '600' }}>{item.mes}</span>
                <div>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem', display: 'block' }}>Receitas</span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{formatCurrency(item.receitas)}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem', display: 'block' }}>Despesas</span>
                  <span style={{ color: '#ef4444', fontWeight: '600' }}>{formatCurrency(item.despesas)}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem', display: 'block' }}>Saldo</span>
                  <span style={{ color: item.saldo >= 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                    {formatCurrency(item.saldo)}
                  </span>
                </div>
              </div>
            ))}
            {fluxoMensal.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                Dados insuficientes para fluxo de caixa
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
            <h4 style={{ color: '#f9fafb', marginBottom: '16px', fontSize: '0.95rem' }}>Resumo do Ano</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Total Receitas</div>
                <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: '700' }}>
                  {formatCurrency(fluxoMensal.reduce((sum, m) => sum + m.receitas, 0))}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Total Despesas</div>
                <div style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: '700' }}>
                  {formatCurrency(fluxoMensal.reduce((sum, m) => sum + m.despesas, 0))}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Saldo do Ano</div>
                <div style={{ 
                  color: fluxoMensal.reduce((sum, m) => sum + m.saldo, 0) >= 0 ? '#10b981' : '#ef4444', 
                  fontSize: '1.25rem', 
                  fontWeight: '700' 
                }}>
                  {formatCurrency(fluxoMensal.reduce((sum, m) => sum + m.saldo, 0))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
