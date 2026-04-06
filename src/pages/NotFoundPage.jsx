import { Link } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#6366f1' }}>404</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Página não encontrada</p>
          <Link to="/" className="btn btn-primary">Voltar ao início</Link>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default NotFoundPage
