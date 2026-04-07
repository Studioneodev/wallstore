import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { wallpapersService } from '../../services/wallpaperService'
import { orderService } from '../../services/orderService'
import { clientService } from '../../services/clientService'
import { financialService } from '../../services/financialService'

function DashboardPage() {
  const [stats, setStats] = useState({
    wallpapers: 0,
    orders: 0,
    clients: 0,
    revenue: 0,
    thisMonthRevenue: 0,
    pendingOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      const [wallpapers, ordersData, clients, financial] = await Promise.all([
        wallpapersService.getAll(),
        orderService.getAll(),
        clientService.getStats(),
        financialService.getSummary()
      ])

      setStats({
        wallpapers: wallpapers.length,
        orders: financial.totalOrders,
        clients: clients.total,
        revenue: financial.totalRevenue,
        thisMonthRevenue: financial.thisMonthRevenue,
        pendingOrders: financial.pendingOrders
      })

      setRecentOrders(ordersData.slice(0, 5))
    } catch (err) {
      console.error('Error loading dashboard:', err)
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: '#fef3c7', text: '#92400e' },
      paid: { bg: '#d1fae5', text: '#065f46' },
      cancelled: { bg: '#fee2e2', text: '#991b1b' }
    }
    return colors[status] || { bg: '#f3f4f6', text: '#374151' }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ color: '#6b7280' }}>Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Dashboard ERP
        </h1>
        <p style={{ color: '#6b7280' }}>Visão geral do seu negócio</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #6366f1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Faturamento Total</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(stats.revenue)}</p>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '24px', height: '24px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#059669', marginTop: '8px' }}>Este mês: {formatCurrency(stats.thisMonthRevenue)}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Pedidos</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{stats.orders}</p>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '24px', height: '24px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '8px' }}>{stats.pendingOrders} pendentes</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Clientes</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{stats.clients}</p>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '24px', height: '24px', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px' }}>Clientes cadastrados</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ec4899' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Wallpapers</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{stats.wallpapers}</p>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '24px', height: '24px', color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px' }}>Produtos cadastrados</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Pedidos Recentes</h3>
            <Link to="/admin/vendas" style={{ color: '#6366f1', fontSize: '0.875rem', fontWeight: '500' }}>Ver todos</Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>Nenhum pedido encontrado</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentOrders.map(order => {
                const statusStyle = getStatusColor(order.status)
                return (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <div>
                      <p style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>#{order.id.slice(0, 8)}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{formatDate(order.created_at)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '600', color: '#111827' }}>{formatCurrency(order.total_amount)}</p>
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                        {order.status === 'paid' ? 'Pago' : order.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>Ações Rápidas</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <Link to="/admin/wallpapers" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '20px', height: '20px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Novo Wallpaper</span>
            </Link>
            
            <Link to="/admin/clientes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '20px', height: '20px', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Ver Clientes</span>
            </Link>
            
            <Link to="/admin/vendas" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '20px', height: '20px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Ver Vendas</span>
            </Link>
            
            <Link to="/admin/financeiro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <svg style={{ width: '20px', height: '20px', color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Financeiro</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
