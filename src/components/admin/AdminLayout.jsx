import { Outlet, NavLink } from 'react-router-dom'
import AdminHeader from './AdminHeader'

function AdminSidebar() {
  const menuItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/wallpapers', label: 'Wallpapers' },
    { path: '/admin/vendas', label: 'Vendas' },
  ]

  return (
    <nav style={{ 
      width: '240px', 
      backgroundColor: '#111827', 
      color: 'white',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      paddingTop: '20px',
    }}>
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>WallStore Admin</h2>
      </div>
      
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/admin'}
        >
          {({ isActive }) => (
            <div style={{
              padding: '14px 20px',
              color: isActive ? 'white' : '#9ca3af',
              backgroundColor: isActive ? '#6366f1' : 'transparent',
              cursor: 'pointer',
              fontSize: '16px',
            }}>
              {item.label}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '240px', flex: 1 }}>
        <AdminHeader />
        <main style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
