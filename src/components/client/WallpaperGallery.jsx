import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { wallpaperService } from '../../services/wallpaperService'
import WallpaperCard from '../../components/client/WallpaperCard'
import CategoryFilter from '../../components/client/CategoryFilter'

function WallpaperGallery({ onOpenCart }) {
  const [wallpapers, setWallpapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [selectedWallpaper, setSelectedWallpaper] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    loadWallpapers()
  }, [category])

  async function loadWallpapers() {
    try {
      setLoading(true)
      const data = await wallpaperService.getActive()
      let filtered = data || []
      
      if (category) {
        filtered = filtered.filter(wp => wp.category === category)
      }
      
      if (search) {
        const searchLower = search.toLowerCase()
        filtered = filtered.filter(wp => 
          wp.title.toLowerCase().includes(searchLower) ||
          wp.description?.toLowerCase().includes(searchLower)
        )
      }
      
      setWallpapers(filtered)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search || category) {
      loadWallpapers()
    }
  }, [search, category])

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <CategoryFilter category={category} onCategoryChange={setCategory} />
        <input
          type="text"
          placeholder="Pesquisar wallpapers..."
          value={search}
          onChange={handleSearch}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        />
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : wallpapers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Nenhum wallpaper encontrado</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
          {wallpapers.map((wallpaper) => (
            <WallpaperCard 
              key={wallpaper.id} 
              wallpaper={wallpaper} 
              onViewDetails={setSelectedWallpaper}
            />
          ))}
        </div>
      )}

      {selectedWallpaper && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setSelectedWallpaper(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedWallpaper.image_url && (
              <img 
                src={selectedWallpaper.image_url} 
                alt={selectedWallpaper.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>{selectedWallpaper.title}</h2>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>{selectedWallpaper.description}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1', marginBottom: '20px' }}>
                R$ {parseFloat(selectedWallpaper.price).toFixed(2)}
              </p>
              <button
                onClick={() => {
                  addToCart(selectedWallpaper)
                  setSelectedWallpaper(null)
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WallpaperGallery
