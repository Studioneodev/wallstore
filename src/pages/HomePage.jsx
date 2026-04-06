import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import Cart from '../components/client/Cart'

function HomePage() {
  const { user } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: '#1f2937', fontWeight: 'bold' }}>
            WallStore
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px' }}>
            wallpapers incríveis para transformar seu ambiente
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <>
                <Link to="/admin" className="btn btn-primary">
                  Painel Admin
                </Link>
                <Link to="/gallery" className="btn btn-secondary">
                  Ver Catálogo
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/gallery" className="btn btn-secondary">
                  Ver Catálogo
                </Link>
              </>
            )}
          </div>

          <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'left' }}>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Wallpapers Exclusivos</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Criação por IA com qualidade profissional</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Pagamento PIX</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Transação rápida e segura</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Download Imediato</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Receba seu wallpaper instantaneamente</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default HomePage
