import { useState } from 'react'
import { wallpaperService } from '../../services/wallpaperService'

const categories = [
  { value: 'landscapes', label: 'Paisagens' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'space', label: 'Espaço' },
  { value: 'nature', label: 'Natureza' },
  { value: 'urban', label: 'Urbano' },
  { value: 'vintage', label: 'Vintage' },
]

function WallpaperForm({ wallpaper, onSave, onCancel }) {
  const [title, setTitle] = useState(wallpaper?.title || '')
  const [description, setDescription] = useState(wallpaper?.description || '')
  const [category, setCategory] = useState(wallpaper?.category || 'landscapes')
  const [price, setPrice] = useState(wallpaper?.price || '')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrl = wallpaper?.image_url
      let imagePath = wallpaper?.image_path

      if (image) {
        setUploading(true)
        const result = await wallpaperService.uploadImage(image)
        imageUrl = result.publicUrl
        imagePath = result.filePath
        setUploading(false)
      }

      const data = {
        title,
        description,
        category,
        price: parseFloat(price),
        image_url: imageUrl,
        image_path: imagePath,
      }

      if (wallpaper?.id) {
        await wallpaperService.update(wallpaper.id, data)
      } else {
        await wallpaperService.create(data)
      }

      onSave()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
        {wallpaper ? 'Editar Wallpaper' : 'Novo Wallpaper'}
      </h3>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Imagem</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
          {wallpaper?.image_url && (
            <img 
              src={wallpaper.image_url} 
              alt={wallpaper.title}
              style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }}
            />
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            type="submit"
            disabled={loading || uploading}
            className="btn btn-primary"
          >
            {loading || uploading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  )
}

export default WallpaperForm
