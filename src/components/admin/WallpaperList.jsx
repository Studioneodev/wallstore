import { useState, useEffect } from 'react'
import { wallpaperService } from '../../services/wallpaperService'

function WallpaperList({ onEdit }) {
  const [wallpapers, setWallpapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadWallpapers = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await wallpaperService.getAll()
      setWallpapers(data || [])
    } catch (err) {
      setError('Erro ao carregar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWallpapers()
  }, [])

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir?')) return
    
    try {
      await wallpaperService.delete(id)
      loadWallpapers()
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
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

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#6b7280' }}>{wallpapers.length} wallpaper(s) encontrado(s)</span>
        <button 
          onClick={loadWallpapers}
          style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
        >
          🔄 Atualizar
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Carregando wallpapers...</p>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '16px', borderRadius: '8px' }}>
          <p>{error}</p>
          <button onClick={loadWallpapers} style={{ marginTop: '8px', padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Tentar novamente
          </button>
        </div>
      ) : wallpapers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '12px' }}>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>Nenhum wallpaper encontrado</p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Clique em "+ Novo Wallpaper" para adicionar o primeiro</p>
        </div>
      ) : (
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
              {wallpapers.map((wp) => (
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
      )}
    </div>
  )
}

export default WallpaperList
