import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { companyService } from '../services/companyService'
import { contactService } from '../services/contactService'
import { taskService } from '../services/taskService'
import { financeiroService } from '../services/financeiroService'

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
    { label: 'Empresas', value: stats.empresas, icon: '🏢', color: '#3b82f6' },
    { label: 'Contatos', value: stats.contatos, icon: '👥', color: '#8b5cf6' },
    { label: 'Tarefas', value: stats.tarefas, icon: '📋', color: '#f59e0b' },
    { label: 'Receitas', value: formatCurrency(stats.receitas), icon: '📈', color: '#10b981' },
    { label: 'Despesas', value: formatCurrency(stats.despesas), icon: '📉', color: '#ef4444' },
    { label: 'Saldo', value: formatCurrency(stats.saldo), icon: '💰', color: stats.saldo >= 0 ? '#10b981' : '#ef4444' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ color: '#6b7280' }}>Carregando dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        {cards.map((card, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.25rem' }}>{card.icon}</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{card.label}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: card.color }}>
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
        <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
          Sistema ERP+CRM completo com Inteligência Artificial. Gerencie suas empresas, contatos, 
          tarefas e finanças em um só lugar.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <a href="/admin/empresas" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
            <span>🏢</span> <span style={{ fontWeight: '500' }}>Empresas</span>
          </a>
          <a href="/admin/contatos" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
            <span>👥</span> <span style={{ fontWeight: '500' }}>Contatos (CRM)</span>
          </a>
          <a href="/admin/tarefas" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
            <span>📋</span> <span style={{ fontWeight: '500' }}>Tarefas</span>
          </a>
          <a href="/admin/financeiro" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
            <span>💰</span> <span style={{ fontWeight: '500' }}>Financeiro</span>
          </a>
          <a href="/admin/petmax-ia" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
            <span>🤖</span> <span style={{ fontWeight: '500' }}>Petmax IA</span>
          </a>
        </div>
      </div>
    </div>
  )
}