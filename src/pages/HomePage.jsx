import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import Cart from '../components/client/Cart'

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '20px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#1f2937' }}>
            WallStore
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px' }}>
            wallpapers incríveis criados por IA
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/gallery" className="btn btn-secondary">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default HomePage
