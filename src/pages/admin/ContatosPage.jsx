import { useState, useEffect } from 'react'
import { contactService } from '../../services/contactService'
import { companyService } from '../../services/companyService'

const pipelineStages = [
  { id: 'novo', label: 'Novo', color: '#3b82f6' },
  { id: 'qualificado', label: 'Qualificado', color: '#8b5cf6' },
  { id: 'proposta', label: 'Proposta', color: '#f59e0b' },
  { id: 'negociacao', label: 'Negociação', color: '#f97316' },
  { id: 'ganho', label: 'Ganho', color: '#10b981' },
  { id: 'perdido', label: 'Perdido', color: '#ef4444' },
]

export default function ContatosPage() {
  const [contatos, setContatos] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [viewMode, setViewMode] = useState('pipeline')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company_id: '',
    position: '',
    source: '',
    status: 'lead',
    pipeline_stage: 'novo',
    value: '',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [contatosData, empresasData] = await Promise.all([
        contactService.getAll(),
        companyService.getAll()
      ])
      setContatos(contatosData || [])
      setEmpresas(empresasData || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setContatos([])
      setEmpresas([])
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = { 
        ...form, 
        value: form.value ? parseFloat(form.value) : null,
        company_id: form.company_id || null
      }
      if (editingId) {
        await contactService.update(editingId, data)
      } else {
        await contactService.create(data)
      }
      setShowForm(false)
      setEditingId(null)
      setForm({ name: '', email: '', phone: '', company_id: '', position: '', source: '', status: 'lead', pipeline_stage: 'novo', value: '', notes: '' })
      loadData()
    } catch (error) {
      console.error('Erro ao salvar contato:', error)
      alert('Erro ao salvar contato: ' + error.message)
    }
  }

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja deletar este contato?')) {
      try {
        await contactService.delete(id)
        loadData()
      } catch (error) {
        alert('Erro ao deletar contato')
      }
    }
  }

  async function handleMoveStage(id, stage) {
    try {
      await contactService.updatePipelineStage(id, stage)
      loadData()
    } catch (error) {
      alert('Erro ao mover contato')
    }
  }

  function handleEdit(contato) {
    setForm(contato)
    setEditingId(contato.id)
    setShowForm(true)
  }

  function getCompanyName(companyId) {
    const empresa = empresas.find(e => e.id === companyId)
    return empresa ? empresa.name : 'Sem empresa'
  }

  if (loading) return <div>Carregando...</div>

  const groupedContacts = pipelineStages.reduce((acc, stage) => {
    acc[stage.id] = contatos.filter(c => c.pipeline_stage === stage.id)
    return acc
  }, {})

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Contatos (CRM)</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setViewMode(viewMode === 'pipeline' ? 'lista' : 'pipeline')} style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            {viewMode === 'pipeline' ? 'Ver Lista' : 'Ver Pipeline'}
          </button>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: '', email: '', phone: '', company_id: '', position: '', source: '', status: 'lead', pipeline_stage: 'novo', value: '', notes: '' }) }} style={{ backgroundColor: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            {showForm ? 'Cancelar' : '+ Novo Contato'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Editar' : 'Novo'} Contato</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Nome *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Telefone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <select value={form.company_id} onChange={e => setForm({...form, company_id: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <option value="">Selecione a Empresa</option>
              {empresas.map(empresa => (
                <option key={empresa.id} value={empresa.id}>{empresa.name}</option>
              ))}
            </select>
            <input type="text" placeholder="Cargo" value={form.position} onChange={e => setForm({...form, position: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Origem" value={form.source} onChange={e => setForm({...form, source: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="number" placeholder="Valor (R$)" value={form.value} onChange={e => setForm({...form, value: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <option value="lead">Lead</option>
              <option value="cliente">Cliente</option>
              <option value="inativo">Inativo</option>
            </select>
            <select value={form.pipeline_stage} onChange={e => setForm({...form, pipeline_stage: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              {pipelineStages.map(stage => <option key={stage.id} value={stage.id}>{stage.label}</option>)}
            </select>
            <textarea placeholder="Notas" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '80px' }} />
            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar Contato
            </button>
          </form>
        </div>
      )}

      {viewMode === 'pipeline' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', overflowX: 'auto' }}>
          {pipelineStages.map(stage => (
            <div key={stage.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: `3px solid ${stage.color}` }}>
                <span style={{ fontWeight: '600' }}>{stage.label}</span>
                <span style={{ backgroundColor: stage.color, color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>{groupedContacts[stage.id]?.length || 0}</span>
              </div>
              {groupedContacts[stage.id]?.map(contato => (
                <div key={contato.id} style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
                  <p style={{ fontWeight: '500', marginBottom: '4px' }}>{contato.name}</p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>{getCompanyName(contato.company_id)}</p>
                  {contato.value && <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>R$ {contato.value}</p>}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                    {stage.id !== 'ganho' && stage.id !== 'perdido' && (
                      <button onClick={() => handleMoveStage(contato.id, pipelineStages[pipelineStages.findIndex(s => s.id === stage.id) + 1]?.id)} style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>→</button>
                    )}
                    <button onClick={() => handleEdit(contato)} style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => handleDelete(contato.id)} style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nome</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Empresa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Telefone</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contatos.map(contato => (
                <tr key={contato.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{contato.name}</td>
                  <td style={{ padding: '12px' }}>{getCompanyName(contato.company_id)}</td>
                  <td style={{ padding: '12px' }}>{contato.email || '-'}</td>
                  <td style={{ padding: '12px' }}>{contato.phone || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: contato.status === 'cliente' ? '#d1fae5' : '#fef3c7', color: contato.status === 'cliente' ? '#065f46' : '#92400e' }}>
                      {contato.status === 'lead' ? 'Lead' : contato.status === 'cliente' ? 'Cliente' : 'Inativo'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(contato)} style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleDelete(contato.id)} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}