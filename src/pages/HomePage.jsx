import { Link } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', padding: '40px 20px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: 'white', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <svg style={{ width: '40px', height: '40px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'white', fontWeight: 'bold' }}>
            Petmax
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '40px' }}>
            ERP + CRM completo com Inteligência Artificial para gestão empresarial inovadora
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/login" 
              style={{ 
                padding: '16px 32px', 
                backgroundColor: 'white', 
                color: '#6366f1', 
                borderRadius: '12px', 
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '1rem'
              }}
            >
              Acessar Sistema
            </Link>
            <Link 
              to="/register" 
              style={{ 
                padding: '16px 32px', 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: '2px solid white', 
                borderRadius: '12px', 
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '1rem'
              }}
            >
              Criar Conta
            </Link>
          </div>

          <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏢</div>
              <p style={{ color: 'white', fontSize: '0.875rem' }}>ERP</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
              <p style={{ color: 'white', fontSize: '0.875rem' }}>CRM</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🤖</div>
              <p style={{ color: 'white', fontSize: '0.875rem' }}>IA</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}