import { useState, useEffect } from 'react'
import { wallpaperService } from '../../services/wallpaperService'

function WallpaperList({ onEdit }) {
  const [wallpapers, setWallpapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadWallpapers()
  }, [])

  async function loadWallpapers() {
    try {
      setLoading(true)
      const data = await wallpaperService.getAll()
      setWallpapers(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir?')) return
    
    try {
      await wallpaperService.delete(id)
      loadWallpapers()
    } catch (err) {
      alert(err.message)
    }
  }

  const categoryLabels = {
    landscapes: 'Paisagens',
    abstract: 'Abstract',
    space: 'Espaço',
    nature: 'Natureza',
    urban: 'Urbano',
    vintage: 'Vintage',
  }

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Imagem</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Título</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Categoria</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Preço</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {wallpapers.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                Nenhum wallpaper encontrado
              </td>
            </tr>
          ) : wallpapers.map((wp) => (
            <tr key={wp.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px' }}>
                {wp.image_url ? (
                  <img 
                    src={wp.image_url} 
                    alt={wp.title}
                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ width: '60px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
                )}
              </td>
              <td style={{ padding: '12px' }}>{wp.title}</td>
              <td style={{ padding: '12px' }}>{categoryLabels[wp.category] || wp.category}</td>
              <td style={{ padding: '12px' }}>R$ {parseFloat(wp.price).toFixed(2)}</td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => onEdit(wp)}
                  style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(wp.id)}
                  style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WallpaperList
