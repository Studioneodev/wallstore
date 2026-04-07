import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

export default function UserHomePage() {
  const { user, signOut, isAdmin } = useAuth()
  const [stats, setStats] = useState({
    companies: 0,
    contacts: 0,
    tasks: 0,
    tarefasConcluidas: 0,
    receitas: 0,
    despesas: 0,
    saldo: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [companies, contacts, tasks, receitas, despesas] = await Promise.all([
        supabase.from('companies').select('id', { count: 'exact', head: true }),
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
        supabase.from('tasks').select('id, status'),
        supabase.from('receitas').select('amount, received'),
        supabase.from('despesas').select('amount, paid')
      ])

      const tarefasConcluidas = tasks.data?.filter(t => t.status === 'concluida').length || 0
      const totalReceitas = receitas.data?.filter(r => r.received).reduce((sum, r) => sum + parseFloat(r.amount || 0), 0) || 0
      const totalDespesas = despesas.data?.filter(d => d.paid).reduce((sum, d) => sum + parseFloat(d.amount || 0), 0) || 0

      setStats({
        companies: companies.count || 0,
        contacts: contacts.count || 0,
        tasks: tasks.data?.length || 0,
        tarefasConcluidas,
        receitas: totalReceitas,
        despesas: totalDespesas,
        saldo: totalReceitas - totalDespesas
      })
    } catch (err) {
      console.error('Erro ao buscar stats:', err)
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '1.2rem' }}>🐾</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>Petmax</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ color: '#6b7280' }}>Olá, <strong>{user?.email?.split('@')[0]}</strong></span>
            {isAdmin && (
              <Link to="/admin" style={{ color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>
                Painel Admin
              </Link>
            )}
            <button onClick={signOut} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }}>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Banner */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: '24px', padding: '48px', marginBottom: '40px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', fontWeight: 'bold' }}>
            Bem-vindo ao Petmax! 🐾
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
            Sua plataforma completa de gestão empresarial com ERP, CRM e Inteligência Artificial.
          </p>
        </div>

        {/* Stats Cards */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏢</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>{stats.companies}</div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Empresas</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>{stats.contacts}</div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Contatos</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>{stats.tarefasConcluidas}/{stats.tasks}</div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Tarefas</div>
          </div>
          <div style={{ backgroundColor: stats.saldo >= 0 ? '#d1fae5' : '#fee2e2', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stats.saldo >= 0 ? '#059669' : '#dc2626' }}>{formatCurrency(stats.saldo)}</div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Saldo</div>
          </div>
        </div>
        )}

        {/* Cards de funcionalidades */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Card Gestão */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>📊</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Gestão Integrada</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Controle todas as operações da sua empresa em um único lugar.
            </p>
          </div>

          {/* Card CRM */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>CRM Completo</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Gerencie clientes, leads e oportunidades com pipeline visual.
            </p>
          </div>

          {/* Card IA */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Inteligência Artificial</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Utilize IA para analisar dados e otimizar processos.
            </p>
          </div>

          {/* Card Financeiro */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fce7f3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>💰</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Financeiro</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Controle receitas, despesas e fluxo de caixa.
            </p>
          </div>
        </div>

        {/* Links rápidos */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
            Acessos Rápidos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <Link to={isAdmin ? "/admin/empresas" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>🏢</span>
              <span style={{ fontWeight: '500' }}>Empresas</span>
            </Link>
            <Link to={isAdmin ? "/admin/contatos" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
              <span style={{ fontWeight: '500' }}>Contatos</span>
            </Link>
            <Link to={isAdmin ? "/admin/tarefas" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <span style={{ fontWeight: '500' }}>Tarefas</span>
            </Link>
            <Link to={isAdmin ? "/admin/calendario" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              <span style={{ fontWeight: '500' }}>Calendário</span>
            </Link>
            <Link to={isAdmin ? "/admin/financeiro" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>💵</span>
              <span style={{ fontWeight: '500' }}>Financeiro</span>
            </Link>
            <Link to={isAdmin ? "/admin/petmax-ia" : "#"} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', color: '#374151', flexDirection: 'column', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              <span style={{ fontWeight: '500' }}>Petmax IA</span>
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'white', padding: '24px 0', marginTop: '40px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', color: '#6b7280' }}>
          <p>© 2024 Petmax - ERP + CRM + IA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
