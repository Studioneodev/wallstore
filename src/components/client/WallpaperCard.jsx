import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { wallpaperService } from '../../services/wallpaperService'

function WallpaperCard({ wallpaper, onViewDetails }) {
  const { addToCart } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)

  const categoryLabels = {
    landscapes: 'Paisagens',
    abstract: 'Abstract',
    space: 'Espaço',
    nature: 'Natureza',
    urban: 'Urbano',
    vintage: 'Vintage',
  }

  return (
    <div 
      style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div 
        style={{ 
          height: '200px', 
          backgroundColor: '#e5e7eb',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => onViewDetails(wallpaper)}
      >
        {wallpaper.image_url ? (
          <img 
            src={wallpaper.image_url} 
            alt={wallpaper.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
            Sem imagem
          </div>
        )}
      </div>
      
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>{wallpaper.title}</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>
          {categoryLabels[wallpaper.category] || wallpaper.category}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6366f1' }}>
            R$ {parseFloat(wallpaper.price).toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(wallpaper)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

export default WallpaperCard
