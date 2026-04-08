import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      const [empresasData, contatosData, tarefasData, resumoData] = await Promise.all([
        companyService.getAll().catch(() => []),
        contactService.getAll().catch(() => []),
        taskService.getAll().catch(() => []),
        financeiroService.getResumo().catch(() => ({ totalReceitas: 0, totalDespesas: 0, saldo: 0 }))
      ])

      const tarefasConcluidas = tarefasData.filter(t => t.status === 'concluida').length

      setStats({
        empresas: empresasData.length || 0,
        contatos: contatosData.length || 0,
        tarefas: tarefasData.length || 0,
        tarefasConcluidas,
        receitas: resumoData.totalReceitas || 0,
        despesas: resumoData.totalDespesas || 0,
        saldo: resumoData.saldo || 0
      })
    } catch (err) {
      console.log('Erro ao carregar stats:', err)
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
    { label: 'Empresas', value: stats.empresas, icon: '🏢', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    { label: 'Contatos', value: stats.contatos, icon: '👥', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
    { label: 'Tarefas', value: stats.tarefas, icon: '📋', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { label: 'Tarefas Concluídas', value: stats.tarefasConcluidas, icon: '✅', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { label: 'Receitas', value: formatCurrency(stats.receitas), icon: '📈', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { label: 'Despesas', value: formatCurrency(stats.despesas), icon: '📉', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
    { label: 'Saldo', value: formatCurrency(stats.saldo), icon: '💰', color: stats.saldo >= 0 ? '#10b981' : '#ef4444', bg: stats.saldo >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' },
  ]

  const menuItems = [
    { path: '/admin/empresas', label: 'Empresas', icon: '🏢', desc: 'Gerencie suas empresas cadastradas' },
    { path: '/admin/contatos', label: 'Contatos (CRM)', icon: '👥', desc: 'Gerencie seus contatos e clientes' },
    { path: '/admin/tarefas', label: 'Tarefas', icon: '📋', desc: 'Acompanhe suas tarefas pendentes' },
    { path: '/admin/calendario', label: 'Calendário', icon: '📅', desc: 'Visualize eventos e agendamentos' },
    { path: '/admin/financeiro', label: 'Financeiro', icon: '💰', desc: 'Controle receitas e despesas' },
    { path: '/admin/petmax-ia', label: 'Petmax IA', icon: '🤖', desc: 'Inteligência Artificial integrada' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '3px solid rgba(99, 102, 241, 0.2)', 
            borderTopColor: '#6366f1', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', 
            margin: '0 auto 16px' 
          }}></div>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Carregando dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f9fafb', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          Visão geral do seu sistema Petmax
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        {cards.map((card, index) => (
          <div key={index} style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #374151',
            transition: 'all 0.2s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: '500' }}>{card.label}</span>
              <span style={{ fontSize: '1.25rem' }}>{card.icon}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '16px', 
        padding: '24px',
        border: '1px solid #374151',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#f9fafb' }}>
          Bem-vindo ao Petmax! 🚀
        </h3>
        <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '20px', fontSize: '0.9rem' }}>
          Sistema ERP+CRM completo com Inteligência Artificial. Gerencie suas empresas, contatos, 
          tarefas e finanças em um só lugar.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '16px', 
                backgroundColor: '#111827', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                color: '#e5e7eb',
                border: '1px solid #374151',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '2px' }}>
                  {item.label}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  {item.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '16px', 
        padding: '24px',
        border: '1px solid #374151'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#f9fafb' }}>
          Atalhos Rápidos
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/empresas" style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            color: '#3b82f6',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '500',
          }}>
            + Nova Empresa
          </Link>
          <Link to="/admin/contatos" style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            color: '#8b5cf6',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '500',
          }}>
            + Novo Contato
          </Link>
          <Link to="/admin/tarefas" style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            color: '#f59e0b',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '500',
          }}>
            + Nova Tarefa
          </Link>
          <Link to="/admin/financeiro" style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '500',
          }}>
            + Nova Transação
          </Link>
        </div>
      </div>
    </div>
  )
}
