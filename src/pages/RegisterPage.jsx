import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await signUp(email, password, name)
      alert('Conta criada! Verifique seu email para confirmar.')
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f3d5c 0%, #1a5f8a 50%, #0d2b42 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '24px', textAlign: 'center', color: '#1f2937' }}>Cadastre-se</h1>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
              required
              minLength={6}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '8px', padding: '14px' }}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          Já tem conta? <Link to="/login" style={{ color: '#6366f1', fontWeight: '600' }}>Faça login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
