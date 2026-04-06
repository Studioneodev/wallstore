import { useState, useEffect } from 'react'
import { orderService } from '../../services/orderService'

function SalesReport() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, count: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [ordersData, statsData] = await Promise.all([
        orderService.getAll(),
        orderService.getStats()
      ])
      setOrders(ordersData || [])
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function approveOrder(orderId) {
    try {
      await orderService.updateStatus(orderId, 'paid', new Date().toISOString())
      loadData()
      alert('Pedido aprovado!')
    } catch (err) {
      alert(err.message)
    }
  }

  async function rejectOrder(orderId) {
    try {
      await orderService.updateStatus(orderId, 'cancelled')
      loadData()
      alert('Pedido cancelado')
    } catch (err) {
      alert(err.message)
    }
  }

  const statusLabels = {
    pending: 'Pendente',
    paid: 'Pago',
    cancelled: 'Cancelado'
  }

  const statusColors = {
    pending: '#f59e0b',
    paid: '#10b981',
    cancelled: '#ef4444'
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Vendas & Pedidos</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total de Pedidos</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.count}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Vendido</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>R$ {stats.total.toFixed(2)}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Recebido</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>R$ {stats.paid.toFixed(2)}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pendente</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>R$ {stats.pending.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Data</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Cliente</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                  Nenhum pedido encontrado
                </td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>
                  {new Date(order.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '12px' }}>{order.users?.email || 'Email não disponível'}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>R$ {parseFloat(order.total_amount).toFixed(2)}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '12px', 
                    backgroundColor: statusColors[order.status] + '20',
                    color: statusColors[order.status],
                    fontWeight: '500',
                    fontSize: '0.875rem'
                  }}>
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => approveOrder(order.id)}
                        style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => rejectOrder(order.id)}
                        style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesReport
