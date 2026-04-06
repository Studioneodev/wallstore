import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/orderService'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import Cart from '../components/client/Cart'

function CheckoutPage() {
  const { user } = useAuth()
  const { items, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pixKey] = useState('41999220456')

  const total = getTotalPrice()

  const handleConfirm = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    setLoading(true)
    
    try {
      const order = {
        user_id: user.id,
        total_amount: total,
        status: 'pending',
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url
        })),
        pix_key: pixKey
      }

      await orderService.create(order)
      clearCart()
      alert('Pedido criado com sucesso! Aguarde confirmação do pagamento.')
      navigate('/my-orders')
    } catch (err) {
      alert('Erro ao criar pedido: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onOpenCart={() => {}} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '16px' }}>Carrinho vazio</h1>
            <Link to="/gallery" className="btn btn-primary">Ver Catálogo</Link>
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>Checkout</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Itens do Pedido</h2>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <img src={item.image_url} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <p style={{ fontWeight: '600' }}>{item.title}</p>
                    <p style={{ color: '#6b7280' }}>Qtd: {item.quantity}</p>
                  </div>
                  <p style={{ marginLeft: 'auto', fontWeight: 'bold' }}>R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '16px' }}>
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Pagamento PIX</h2>
              <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ color: '#16a34a', fontWeight: '600' }}>Pagamento via PIX</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Scanear QR Code ou copiar chave</p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>Chave PIX:</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={pixKey} readOnly style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <button onClick={() => navigator.clipboard.writeText(pixKey)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer' }}>Copiar</button>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
                Após pagamento, seu wallpaper será enviado por email.
              </p>

              <button onClick={handleConfirm} disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                {loading ? 'Processando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default CheckoutPage
