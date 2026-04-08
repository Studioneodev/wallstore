import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      console.log('Iniciando cadastro para:', email)
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          emailConfirm: false
        }
      })
      
      console.log('Signup result:', { data, error: signUpError })
      
      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          setError('Este email já está cadastrado. Tente fazer login ou recupere a senha.')
        } else if (signUpError.message.includes('Password')) {
          setError('Senha muito fraca. Use pelo menos 6 caracteres.')
        } else {
          setError(signUpError.message)
        }
        setLoading(false)
        return
      }

      if (!data.user) {
        setError('Erro ao criar usuário. Tente novamente.')
        setLoading(false)
        return
      }

      // Inserir na tabela users
      const { error: insertError } = await supabase.from('users').insert([{
        id: data.user.id,
        email: email,
        name: name,
        is_admin: false
      }])
      
      if (insertError) {
        console.error('Erro ao inserir na tabela users:', insertError)
      }
      
      // Verificar se precisa confirmar email
      if (data.session) {
        // Login automático funcionou (sem confirmação de email)
        navigate('/home')
      } else {
        // Precisa confirmar email - mostra mensagem de sucesso
        setSuccess(true)
      }
    } catch (err) {
      console.error('Erro completo:', err)
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: '#10b981', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#1f2937' }}>Conta criada!</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Sua conta foi criada com sucesso. 
          </p>
          <p style={{ color: '#6b7280', marginBottom: '24px', backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px' }}>
            📧 <strong>Verifique seu email!</strong><br/>
            Enviamos um link de confirmação para <strong>{email}</strong>.<br/>
            Clique no link para ativar sua conta.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              display: 'inline-block',
              padding: '12px 24px', 
              backgroundColor: '#6366f1', 
              color: 'white', 
              borderRadius: '8px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Ir para Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: '#6366f1', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.5rem', color: '#1f2937' }}>Criar Conta</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Petmax ERP + CRM + IA</p>
        </div>
        
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
          
          <button type="submit" disabled={loading} style={{ 
            marginTop: '8px', 
            padding: '14px', 
            backgroundColor: '#6366f1', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Criando...' : 'Cadastrar'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          Já tem conta? <Link to="/login" style={{ color: '#6366f1', fontWeight: '600' }}>Faça login</Link>
        </p>
        
        <p style={{ marginTop: '12px', textAlign: 'center', color: '#6b7280' }}>
          <Link to="/" style={{ color: '#6366f1', fontWeight: '500' }}>← Voltar para Home</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage