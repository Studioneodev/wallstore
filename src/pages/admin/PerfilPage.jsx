import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function PerfilPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [activeTab, setActiveTab] = useState('dados')

  const handleSave = (e) => {
    e.preventDefault()
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    alert('Perfil atualizado com sucesso!')
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
        Meu Perfil
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#6366f1', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: '600',
              margin: '0 auto 12px'
            }}>
              {(form.name || form.email || 'U')[0].toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '4px' }}>
              {form.name || 'Usuário'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {form.email || 'admin@petmax.com'}
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('dados')}
            style={{ 
              width: '100%', 
              padding: '12px', 
              textAlign: 'left',
              backgroundColor: activeTab === 'dados' ? '#f3f4f6' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '8px',
              fontWeight: activeTab === 'dados' ? '500' : '400'
            }}
          >
            Dados Pessoais
          </button>
          <button 
            onClick={() => setActiveTab('senha')}
            style={{ 
              width: '100%', 
              padding: '12px', 
              textAlign: 'left',
              backgroundColor: activeTab === 'senha' ? '#f3f4f6' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '8px',
              fontWeight: activeTab === 'senha' ? '500' : '400'
            }}
          >
            Alterar Senha
          </button>
          <button 
            onClick={() => setActiveTab('notificacoes')}
            style={{ 
              width: '100%', 
              padding: '12px', 
              textAlign: 'left',
              backgroundColor: activeTab === 'notificacoes' ? '#f3f4f6' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeTab === 'notificacoes' ? '500' : '400'
            }}
          >
            Notificações
          </button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {activeTab === 'dados' && (
            <form onSubmit={handleSave}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>
                Dados Pessoais
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Nome Completo
                  </label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                    disabled
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Telefone
                  </label>
                  <input 
                    type="text" 
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Cargo/Função
                  </label>
                  <input 
                    type="text" 
                    value="Administrador"
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb' }}
                    disabled
                  />
                </div>
              </div>
              <button type="submit" style={{ marginTop: '20px', backgroundColor: '#6366f1', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Salvar Alterações
              </button>
            </form>
          )}

          {activeTab === 'senha' && (
            <form onSubmit={handleSave}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>
                Alterar Senha
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Senha Atual
                  </label>
                  <input 
                    type="password" 
                    value={form.currentPassword}
                    onChange={(e) => setForm({...form, currentPassword: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Nova Senha
                  </label>
                  <input 
                    type="password" 
                    value={form.newPassword}
                    onChange={(e) => setForm({...form, newPassword: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Confirmar Nova Senha
                  </label>
                  <input 
                    type="password" 
                    value={form.confirmPassword}
                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
              </div>
              <button type="submit" style={{ marginTop: '20px', backgroundColor: '#6366f1', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Alterar Senha
              </button>
            </form>
          )}

          {activeTab === 'notificacoes' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>
                Preferências de Notificações
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <span>Notificações por email</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <span>Alertas de tarefas pendentes</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <span>Relatórios semanais</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                  <span>Novidades e atualizações</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
