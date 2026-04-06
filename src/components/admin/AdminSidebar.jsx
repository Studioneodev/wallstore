import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/wallpapers', label: 'Wallpapers', icon: '🖼️' },
  { path: '/admin/chat-ia', label: 'Chat IA', icon: '💬' },
  { path: '/admin/gerar-imagens', label: 'Gerar Imagens', icon: '🎨' },
  { path: '/admin/vendas', label: 'Vendas & Clientes', icon: '💰' },
]

function AdminSidebar() {
  return (
    <aside style={{ 
      width: '240px', 
      backgroundColor: '#1f2937', 
      color: 'white',
      padding: '20px 0'
    }}>
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>WallStore Admin</h2>
      </div>
      
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: isActive ? '#6366f1' : '#d1d5db',
              backgroundColor: isActive ? '#374151' : 'transparent',
              textDecoration: 'none',
              borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
            })}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
