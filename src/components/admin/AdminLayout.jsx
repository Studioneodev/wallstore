import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminSidebar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    navigate('/login')
  }

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'dashboard', exact: true },
    { path: '/admin/empresas', label: 'Empresas', icon: 'building' },
    { path: '/admin/contatos', label: 'Contatos (CRM)', icon: 'users' },
    { path: '/admin/tarefas', label: 'Tarefas', icon: 'tasks' },
    { path: '/admin/financeiro', label: 'Financeiro', icon: 'money' },
    { path: '/admin/petmax-ia', label: 'Petmax IA', icon: 'ai' },
  ]

  const icons = {
    dashboard: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    building: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    users: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tasks: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    money: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ai: (
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  }

  return (
    <nav style={{ 
      width: '260px', 
      backgroundColor: '#111827', 
      color: 'white',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      paddingTop: '20px',
      zIndex: 10,
    }}>
      <div style={{ padding: '0 20px', marginBottom: '40px', borderBottom: '1px solid #374151', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Petmax</h2>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>ERP + CRM + IA</p>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '0 12px' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
          >
            {({ isActive }) => (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '4px',
                color: isActive ? 'white' : '#9ca3af',
                backgroundColor: isActive ? '#6366f1' : 'transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: isActive ? '500' : '400',
                transition: 'all 0.15s ease',
              }}>
                {icons[item.icon]}
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', padding: '0 12px' }}>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #374151', paddingTop: '20px' }}>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '8px' }}>
            {user?.name || user?.email}
          </div>
          <button 
            onClick={handleLogout}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </div>
    </nav>
  )
}

function AdminHeader() {
  return (
    <header style={{ 
      marginLeft: '260px', 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}></h1>
      </div>
    </header>
  )
}

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '260px', flex: 1 }}>
        <AdminHeader />
        <main style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout