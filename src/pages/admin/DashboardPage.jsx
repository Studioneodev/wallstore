function DashboardPage() {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Wallpapers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>0</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Vendas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>R$ 0</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem' }}>Clientes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>0</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
