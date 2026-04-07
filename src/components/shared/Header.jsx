import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Header() {
  const { user, signOut, isAdmin } = useAuth()

  return (
    <header style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1', textDecoration: 'none' }}>
          Petmax
        </Link>
        
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#374151', fontWeight: '500' }}>Home</Link>
          {user && isAdmin && (
            <Link to="/admin" style={{ color: '#6366f1', fontWeight: '500' }}>Painel Admin</Link>
          )}
          {user ? (
            <button 
              onClick={signOut}
              style={{ background: 'none', border: 'none', color: '#374151', fontWeight: '500', cursor: 'pointer' }}
            >
              Sair
            </button>
          ) : (
            <Link to="/login" style={{ color: '#374151', fontWeight: '500' }}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header