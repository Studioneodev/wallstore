import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderService } from '../services/orderService'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

function MyOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  async function loadOrders() {
    try {
      setLoading(true)
      const data = await orderService.getByUser(user.id)
      setOrders(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
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

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onOpenCart={() => {}} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px' }}>Faça login para ver seus pedidos</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCart={() => {}} />
      
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Meus Pedidos</h2>
          
          {loading ? (
            <p>Carregando...</p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '12px' }}>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Você ainda não fez nenhum pedido</p>
              <Link to="/gallery" className="btn btn-primary">Ver Catálogo</Link>
            </div>
          ) : (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Data</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Itens</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {order.items ? order.items.length : 0} item(s)
                      </td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default MyOrdersPage
