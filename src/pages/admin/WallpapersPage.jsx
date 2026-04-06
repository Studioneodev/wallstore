import { useState } from 'react'
import WallpaperForm from '../../components/admin/WallpaperForm'
import WallpaperList from '../../components/admin/WallpaperList'

function WallpapersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingWallpaper, setEditingWallpaper] = useState(null)

  function handleEdit(wallpaper) {
    setEditingWallpaper(wallpaper)
    setShowForm(true)
  }

  function handleSave() {
    setShowForm(false)
    setEditingWallpaper(null)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingWallpaper(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Gerenciar Wallpapers</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            + Novo Wallpaper
          </button>
        )}
      </div>

      {showForm ? (
        <WallpaperForm 
          wallpaper={editingWallpaper} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <WallpaperList onEdit={handleEdit} />
      )}
    </div>
  )
}

export default WallpapersPage
