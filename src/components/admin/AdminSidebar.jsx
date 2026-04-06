import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/wallpapers', label: 'Wallpapers', icon: '🖼️' },
    { path: '/admin/vendas', label: 'Vendas & Clientes', icon: '💰' },
  ]

  return (
    <aside style={{ 
      width: '240px', 
      backgroundColor: '#1f2937', 
      color: 'white',
      padding: '20px 0',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>WallStore Admin</h2>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              color: isActive ? '#fff' : '#9ca3af',
              backgroundColor: isActive ? '#6366f1' : 'transparent',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
            })}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
