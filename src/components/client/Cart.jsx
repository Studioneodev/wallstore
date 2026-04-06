import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

function Cart({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Carrinho</h2>
        <button onClick={onClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Carrinho vazio</p>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
              <img 
                src={item.image_url} 
                alt={item.title}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ color: '#6366f1', fontWeight: 'bold' }}>R$ {parseFloat(item.price).toFixed(2)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
                  >+</button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ marginLeft: 'auto', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.125rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>R$ {getTotalPrice().toFixed(2)}</span>
          </div>
          <Link 
            to="/checkout"
            onClick={onClose}
            style={{ display: 'block', textAlign: 'center', padding: '12px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}
          >
            Finalizar Compra
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
