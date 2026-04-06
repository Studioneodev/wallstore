import { useState } from 'react'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import Cart from '../components/client/Cart'
import WallpaperGallery from '../components/client/WallpaperGallery'

function GalleryPage() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Catálogo de Wallpapers</h1>
          </div>
          <WallpaperGallery onOpenCart={() => setCartOpen(true)} />
        </div>
      </main>
      
      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default GalleryPage
