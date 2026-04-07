import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import Cart from '../components/client/Cart'

function HomePage() {
  const { user } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/welcome')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: '#1f2937', fontWeight: 'bold' }}>
            WallStore
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px' }}>
            wallpapers incríveis para transformar seu ambiente
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/gallery" className="btn btn-primary">
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
