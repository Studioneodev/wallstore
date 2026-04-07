import { useState, useEffect } from 'react'
import { clientService } from '../../services/clientService'
import { orderService } from '../../services/orderService'

function ClientesPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientOrders, setClientOrders] = useState([])

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      const data = await clientService.getAll()
      setClients(data)
    } catch (err) {
      console.error('Error loading clients:', err)
    } finally {
      setLoading(false)
    }
  }

  async function searchClients() {
    if (!search.trim()) {
      loadClients()
      return
    }
    try {
      const data = await clientService.search(search)
      setClients(data)
    } catch (err) {
      console.error('Error searching clients:', err)
    }
  }

  async function viewClientDetails(client) {
    setSelectedClient(client)
    try {
      const orders = await orderService.getByUser(client.id)
      setClientOrders(orders)
    } catch (err) {
      console.error('Error loading client orders:', err)
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
      year: 'numeric'
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

  const getClientStats = (clientId) => {
    const orders = clientOrders.filter(o => o.user_id === clientId)
    const total = orders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    const paid = orders.filter(o => o.status === 'paid').length
    const pending = orders.filter(o => o.status === 'pending').length
    return { total, paid, pending, count: orders.length }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Clientes (CRM)
          </h1>
          <p style={{ color: '#6b7280' }}>Gerencie seus clientes e histórico de compras</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Buscar por email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchClients()}
            style={{ flex: 1, minWidth: '200px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.875rem' }}
          />
          <button onClick={searchClients} style={{ padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            Buscar
          </button>
          <button onClick={() => { setSearch(''); loadClients(); }} style={{ padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            Limpar
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', color: '#6b7280' }}>Carregando...</div>
      ) : clients.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#6b7280' }}>
          <p>Nenhum cliente encontrado</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Cliente</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Cadastro</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Pedidos</th>
                <th style={{ padding: '16px', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Gasto</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => {
                const stats = getClientStats(client.id)
                return (
                  <tr key={client.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: '600' }}>
                          {client.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontWeight: '500', color: '#111827' }}>{client.email}</p>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>ID: {client.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>
                      {formatDate(client.created_at)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{stats.count}</span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#059669' }}>
                      {formatCurrency(stats.total)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button onClick={() => viewClientDetails(client)} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedClient && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }} onClick={() => setSelectedClient(null)}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '700px', maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Detalhes do Cliente</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{selectedClient.email}</p>
              </div>
              <button onClick={() => setSelectedClient(null)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{clientOrders.length}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Pedidos</p>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#d1fae5', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{clientOrders.filter(o => o.status === 'paid').length}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Pagos</p>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>{clientOrders.filter(o => o.status === 'pending').length}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Pendentes</p>
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Histórico de Pedidos</h3>
              
              {clientOrders.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>Nenhum pedido encontrado</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {clientOrders.map(order => {
                    const statusStyle = getStatusColor(order.status)
                    return (
                      <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                        <div>
                          <p style={{ fontWeight: '500', color: '#111827' }}>#{order.id.slice(0, 8)}</p>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientesPage
