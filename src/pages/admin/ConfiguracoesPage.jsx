import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabaseClient'

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState('')
  const [settings, setSettings] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
  })

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('petmax')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('petmax').getPublicUrl(filePath)
      setLogoUrl(data.publicUrl)
      alert('Logo uploaded successfully!')
    } catch (err) {
      console.error('Error uploading logo:', err)
      alert('Erro ao fazer upload do logo')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
        Configurações do Sistema
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Card Upload Logo */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            Logo da Empresa
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {logoUrl ? (
              <div style={{ position: 'relative' }}>
                <img 
                  src={logoUrl} 
                  alt="Logo da empresa" 
                  style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '12px', border: '2px dashed #d1d5db' }}
                />
                <button 
                  onClick={() => setLogoUrl('')}
                  style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #d1d5db', borderRadius: '12px', backgroundColor: '#f9fafb' }}>
                <span style={{ fontSize: '3rem', color: '#9ca3af' }}>🏢</span>
              </div>
            )}
            <label style={{ cursor: 'pointer', padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: '500', transition: 'background 0.2s' }}>
              {loading ? 'Enviando...' : 'Upload Logo'}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoUpload} 
                disabled={loading}
                style={{ display: 'none' }}
              />
            </label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
              PNG, JPG ou GIF. Máximo 2MB.<br/>Tamanho recomendado: 200x200px
            </p>
          </div>
        </div>

        {/* Card Dados da Empresa */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            Dados da Empresa
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Nome da Empresa
              </label>
              <input 
                type="text" 
                value={settings.companyName}
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Email
              </label>
              <input 
                type="email" 
                value={settings.companyEmail}
                onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Telefone
              </label>
              <input 
                type="text" 
                value={settings.companyPhone}
                onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar Dados
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            Preferências Regionais
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Fuso Horário
              </label>
              <select 
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              >
                <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                <option value="America/Manaus">Manaus (GMT-4)</option>
                <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Idioma
              </label>
              <select 
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Moeda
              </label>
              <select 
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              >
                <option value="BRL">Real Brasileiro (R$)</option>
                <option value="USD">Dólar Americano ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Formato de Data
              </label>
              <select 
                value={settings.dateFormat}
                onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar Preferências
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            Segurança
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
              Alterar Senha
            </button>
            <button style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
              Autenticação em 2 Fatores
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
            Informações do Plano
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6b7280' }}>Plano Atual:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>Professional</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6b7280' }}>Usuários:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>1 / 10</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Validade:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>Ilimitado</span>
            </div>
          </div>
          <button style={{ width: '100%', marginTop: '16px', backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
            Alterar Plano
          </button>
        </div>
      </div>
    </div>
  )
}
