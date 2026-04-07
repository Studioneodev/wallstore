import { useState, useEffect } from 'react'
import { companyService } from '../../services/companyService'

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    segment: '',
    notes: ''
  })

  useEffect(() => {
    loadEmpresas()
  }, [])

  async function loadEmpresas() {
    try {
      const data = await companyService.getAll()
      setEmpresas(data || [])
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar empresas:', err.message)
      setError('Erro ao carregar empresas. Verifique o banco de dados.')
      setEmpresas([])
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingId) {
        await companyService.update(editingId, form)
      } else {
        await companyService.create(form)
      }
      setShowForm(false)
      setEditingId(null)
      setForm({ name: '', cnpj: '', email: '', phone: '', address: '', city: '', state: '', zip_code: '', segment: '', notes: '' })
      loadEmpresas()
    } catch (err) {
      alert('Erro ao salvar: ' + err.message)
    }
  }

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja deletar esta empresa?')) {
      try {
        await companyService.delete(id)
        loadEmpresas()
      } catch (err) {
        alert('Erro ao deletar: ' + err.message)
      }
    }
  }

  async function toggleAtivo(id, isActive) {
    try {
      await companyService.toggleActive(id, !isActive)
      loadEmpresas()
    } catch (err) {
      alert('Erro ao atualizar status')
    }
  }

  function handleEdit(empresa) {
    setForm(empresa)
    setEditingId(empresa.id)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Empresas</h2>
        <button 
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: '', cnpj: '', email: '', phone: '', address: '', city: '', state: '', zip_code: '', segment: '', notes: '' }) }}
          style={{ backgroundColor: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          {showForm ? 'Cancelar' : '+ Nova Empresa'}
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Editar' : 'Nova'} Empresa</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Razão Social *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="CNPJ" value={form.cnpj} onChange={e => setForm({...form, cnpj: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Telefone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Endereço" value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Cidade" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Estado" value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="CEP" value={form.zip_code} onChange={e => setForm({...form, zip_code: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Segmento" value={form.segment} onChange={e => setForm({...form, segment: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <textarea placeholder="Observações" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '80px' }} />
            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar Empresa
            </button>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {empresas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
            {error ? 'Erro ao carregar' : 'Nenhuma empresa cadastrada'}
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nome</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>CNPJ</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Cidade</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map(empresa => (
                <tr key={empresa.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{empresa.name}</td>
                  <td style={{ padding: '12px' }}>{empresa.cnpj || '-'}</td>
                  <td style={{ padding: '12px' }}>{empresa.email || '-'}</td>
                  <td style={{ padding: '12px' }}>{empresa.city || '-'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      onClick={() => toggleAtivo(empresa.id, empresa.is_active)}
                      style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: empresa.is_active ? '#d1fae5' : '#fee2e2', color: empresa.is_active ? '#065f46' : '#991b1b', fontSize: '0.75rem' }}
                    >
                      {empresa.is_active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(empresa)} style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleDelete(empresa.id)} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}