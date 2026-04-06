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
  const [imageUrl, setImageUrl] = useState(wallpaper?.image_url || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [useUrl, setUseUrl] = useState(!!wallpaper?.image_url)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let finalImageUrl = imageUrl
      let finalImagePath = wallpaper?.image_path

      if (image) {
        setUploading(true)
        const result = await wallpaperService.uploadImage(image)
        finalImageUrl = result.publicUrl
        finalImagePath = result.filePath
        setUploading(false)
      }

      if (!finalImageUrl) {
        throw new Error('Imagem é obrigatória')
      }

      const data = {
        title,
        description,
        category,
        price: parseFloat(price),
        image_url: finalImageUrl,
        image_path: finalImagePath,
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
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex: Pôr do sol nas montanhas"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Descrição do wallpaper..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Categoria *</label>
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
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Preço (R$) *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="9.90"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Imagem *</label>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={!useUrl} 
                onChange={() => setUseUrl(false)} 
              />
              Upload de arquivo
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={useUrl} 
                onChange={() => setUseUrl(true)} 
              />
              URL da imagem
            </label>
          </div>

          {useUrl ? (
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
            />
          )}
          
          {wallpaper?.image_url && (
            <div style={{ marginTop: '12px' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>Imagem atual:</p>
              <img 
                src={wallpaper.image_url} 
                alt={wallpaper.title}
                style={{ width: '150px', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            type="submit"
            disabled={loading || uploading}
            className="btn btn-primary"
          >
            {loading || uploading ? 'Salvando...' : 'Salvar Wallpaper'}
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
