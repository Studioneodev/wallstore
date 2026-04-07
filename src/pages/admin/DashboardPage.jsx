import { useState, useEffect } from 'react'
import { companyService } from '../../services/companyService'
import { contactService } from '../../services/contactService'
import { taskService } from '../../services/taskService'
import { financeiroService } from '../../services/financeiroService'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    empresas: 0,
    contatos: 0,
    tarefas: 0,
    tarefasConcluidas: 0,
    receitas: 0,
    despesas: 0,
    saldo: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const [empresas, contatos, tarefas, financeiro] = await Promise.all([
        companyService.getAll().catch(() => []),
        contactService.getAll().catch(() => []),
        taskService.getStats().catch(() => ({ total: 0, concluida: 0 })),
        financeiroService.getResumo().catch(() => ({ totalReceitas: 0, totalDespesas: 0, saldo: 0 }))
      ])

      setStats({
        empresas: empresas.length || 0,
        contatos: contatos.length || 0,
        tarefas: tarefas.total || 0,
        tarefasConcluidas: tarefas.concluida || 0,
        receitas: financeiro.totalReceitas || 0,
        despesas: financeiro.totalDespesas || 0,
        saldo: financeiro.saldo || 0
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0)
  }

  const cards = [
    { label: 'Empresas', value: stats.empresas, icon: '🏢', color: '#3b82f6' },
    { label: 'Contatos', value: stats.contatos, icon: '👥', color: '#8b5cf6' },
    { label: 'Tarefas Pendentes', value: stats.tarefas - stats.tarefasConcluidas, icon: '📋', color: '#f59e0b' },
    { label: 'Receitas', value: formatCurrency(stats.receitas), icon: '📈', color: '#10b981' },
    { label: 'Despesas', value: formatCurrency(stats.despesas), icon: '📉', color: '#ef4444' },
    { label: 'Saldo', value: formatCurrency(stats.saldo), icon: '💰', color: stats.saldo >= 0 ? '#10b981' : '#ef4444' },
  ]

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Carregando dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
        Dashboard Petmax
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        {cards.map((card, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{card.label}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Bem-vindo ao Petmax!
        </h3>
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          Sistema ERP+CRM completo com Inteligência Artificial. Gerencie suas empresas, contatos, 
          tarefas e finanças em um só lugar. Use a IA para tirar dúvidas sobre questões fiscais, 
          trabalhistas e consultoria empresarial.
        </p>
      </div>
    </div>
  )
}