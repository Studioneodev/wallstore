import { useState, useEffect } from 'react'
import { taskService } from '../../services/taskService'

const priorityColors = {
  baixa: '#6b7280',
  media: '#3b82f6',
  alta: '#f59e0b',
  urgente: '#ef4444'
}

const statusColors = {
  pendente: '#f59e0b',
  em_progresso: '#3b82f6',
  concluida: '#10b981'
}

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'media',
    status: 'pendente',
    due_date: '',
    category: ''
  })

  useEffect(() => {
    loadTarefas()
  }, [])

  async function loadTarefas() {
    try {
      const data = await taskService.getAll()
      setTarefas(data || [])
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
      setTarefas([])
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingId) {
        await taskService.update(editingId, form)
      } else {
        await taskService.create(form)
      }
      setShowForm(false)
      setEditingId(null)
      setForm({ title: '', description: '', priority: 'media', status: 'pendente', due_date: '', category: '' })
      loadTarefas()
    } catch (error) {
      alert('Erro ao salvar tarefa')
    }
  }

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await taskService.delete(id)
        loadTarefas()
      } catch (error) {
        alert('Erro ao deletar tarefa')
      }
    }
  }

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'concluida' ? 'pendente' : 'concluida'
    try {
      await taskService.updateStatus(id, newStatus)
      loadTarefas()
    } catch (error) {
      alert('Erro ao atualizar status')
    }
  }

  function handleEdit(tarefa) {
    setForm(tarefa)
    setEditingId(tarefa.id)
    setShowForm(true)
  }

  const filteredTarefas = filter === 'all' ? tarefas : tarefas.filter(t => t.status === filter)

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Tarefas</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
            <option value="all">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="concluida">Concluídas</option>
          </select>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: '', description: '', priority: 'media', status: 'pendente', due_date: '', category: '' }) }} style={{ backgroundColor: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            {showForm ? 'Cancelar' : '+ Nova Tarefa'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Editar' : 'Nova'} Tarefa</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Título" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <textarea placeholder="Descrição" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '80px' }} />
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <option value="pendente">Pendente</option>
              <option value="em_progresso">Em Progresso</option>
              <option value="concluida">Concluída</option>
            </select>
            <input type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <input type="text" placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Salvar Tarefa
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredTarefas.map(tarefa => (
          <div key={tarefa.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${priorityColors[tarefa.priority]}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px', textDecoration: tarefa.status === 'concluida' ? 'line-through' : 'none' }}>{tarefa.title}</h4>
                {tarefa.category && <span style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px' }}>{tarefa.category}</span>}
              </div>
              <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: statusColors[tarefa.status], color: 'white' }}>
                {tarefa.status === 'pendente' ? 'Pendente' : tarefa.status === 'em_progresso' ? 'Em Progresso' : 'Concluída'}
              </span>
            </div>
            {tarefa.description && <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '12px' }}>{tarefa.description}</p>}
            {tarefa.due_date && <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '12px' }}>📅 {new Date(tarefa.due_date).toLocaleDateString('pt-BR')}</p>}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => toggleStatus(tarefa.id, tarefa.status)} style={{ flex: 1, padding: '8px', backgroundColor: tarefa.status === 'concluida' ? '#f59e0b' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {tarefa.status === 'concluida' ? 'Reabrir' : 'Concluir'}
              </button>
              <button onClick={() => handleEdit(tarefa)} style={{ padding: '8px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>✏️</button>
              <button onClick={() => handleDelete(tarefa.id)} style={{ padding: '8px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {filteredTarefas.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Nenhuma tarefa encontrada</div>
      )}
    </div>
  )
}