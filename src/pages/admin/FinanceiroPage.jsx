import { useState, useEffect } from 'react'
import { financialService } from '../../services/financialService'
import { orderService } from '../../services/orderService'

function FinanceiroPage() {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    thisMonthRevenue: 0,
    pendingAmount: 0,
    cancelledAmount: 0,
    totalOrders: 0,
    paidOrders: 0,
    pendingOrders: 0
  })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [filterDate, setFilterDate] = useState('all')

  useEffect(() => {
    loadData()
  }, [filter, filterDate])

  async function loadData() {
    try {
      const [summaryData, ordersData] = await Promise.all([
        financialService.getSummary(),
        orderService.getAll()
      ])
      
      setSummary(summaryData)
      
      let filtered = ordersData
      if (filter !== 'all') {
        filtered = filtered.filter(o => o.status === filter)
      }
      
      if (filterDate !== 'all') {
        const now = new Date()
        let startDate = new Date()
        
        if (filterDate === 'today') {
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        } else if (filterDate === 'week') {
          startDate.setDate(now.getDate() - 7)
        } else if (filterDate === 'month') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        } else if (filterDate === 'year') {
          startDate = new Date(now.getFullYear(), 0, 1)
        }
        
        filtered = filtered.filter(o => new Date(o.created_at) >= startDate)
      }
      
      setOrders(filtered)
    } catch (err) {
      console.error('Error loading financial data:', err)
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

  async function updateOrderStatus(orderId, newStatus) {
    try {
      if (newStatus === 'paid') {
        await orderService.updateStatus(orderId, newStatus, new Date().toISOString())
      } else {
        await orderService.updateStatus(orderId, newStatus)
      }
      loadData()
    } catch (err) {
      console.error('Error updating order:', err)
      alert('Erro ao atualizar status')
    }
  }

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true
    return o.status === filter
  })

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ color: '#6b7280' }}>Carregando dados financeiros...</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Financeiro
        </h1>
        <p style={{ color: '#6b7280' }}>Controle de receitas e gestão financeira</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Faturamento Total</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(summary.totalRevenue)}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #6366f1' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Faturamento Este Mês</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(summary.thisMonthRevenue)}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Valor Pendente</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(summary.pendingAmount)}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Pedidos Cancelados</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827' }}>{summary.pendingOrders}</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: 'white' }}>
            <option value="all">Todos os Status</option>
            <option value="paid">Pagos</option>
            <option value="pending">Pendentes</option>
            <option value="cancelled">Cancelados</option>
          </select>
          
          <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: 'white' }}>
            <option value="all">Todo Período</option>
            <option value="today">Hoje</option>
            <option value="week">Última Semana</option>
            <option value="month">Este Mês</option>
            <option value="year">Este Ano</option>
          </select>
          
          <div style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '0.875rem' }}>
            {filteredOrders.length} pedido(s) • Total: {formatCurrency(filteredOrders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0))}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Pedido</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Cliente</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Data</th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Valor</th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Nenhum pedido encontrado</td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const statusStyle = getStatusColor(order.status)
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontWeight: '500', color: '#111827' }}>#{order.id.slice(0, 8)}</p>
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>
                      {order.users?.email || 'Cliente'}
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>
                      {formatDate(order.created_at)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px', backgroundColor: statusStyle.bg, color: statusStyle.text, fontWeight: '500' }}>
                        {order.status === 'paid' ? 'Pago' : order.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#111827' }}>
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {order.status === 'pending' && (
                        <button onClick={() => updateOrderStatus(order.id, 'paid')} style={{ padding: '6px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer', marginRight: '8px' }}>
                          Confirmar Pagamento
                        </button>
                      )}
                      {order.status === 'paid' && (
                        <button onClick={() => updateOrderStatus(order.id, 'cancelled')} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer' }}>
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinanceiroPage
