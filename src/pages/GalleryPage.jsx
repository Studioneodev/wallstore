import { Link } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

function GalleryPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '40px 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>Catálogo de Wallpapers</h1>
          <p style={{ color: '#6b7280' }}>Fase 6: Galeria de wallpapers será implementada aqui</p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default GalleryPage
