import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header style={{ 
      backgroundColor: 'white', 
      padding: '16px 24px', 
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
        Painel Admin
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: '#6b7280' }}>{user?.email}</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Sair
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
