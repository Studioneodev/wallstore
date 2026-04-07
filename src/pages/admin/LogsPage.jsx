import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function LogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLogs()
  }, [])

  async function loadLogs() {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      if (error) throw error
      setLogs(data || [])
    } catch (err) {
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActionColor = (action) => {
    const colors = {
      create: '#10b981',
      update: '#3b82f6',
      delete: '#ef4444',
      login: '#6366f1',
      logout: '#6b7280'
    }
    return colors[action] || '#6b7280'
  }

  const getActionLabel = (action) => {
    const labels = {
      create: 'Criação',
      update: 'Atualização',
      delete: 'Exclusão',
      login: 'Login',
      logout: 'Logout'
    }
    return labels[action] || action
  }

  const mockLogs = [
    { id: 1, user: 'admin@petmax.com', action: 'create', module: 'contacts', description: 'Novo contato criado: João Silva', created_at: new Date().toISOString() },
    { id: 2, user: 'admin@petmax.com', action: 'update', module: 'tasks', description: 'Tarefa atualizada: Revisão mensal', created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, user: 'admin@petmax.com', action: 'create', module: 'companies', description: 'Nova empresa cadastrada: Tech Solutions', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 4, user: 'admin@petmax.com', action: 'login', module: 'auth', description: 'Login realizado', created_at: new Date(Date.now() - 10800000).toISOString() },
    { id: 5, user: 'admin@petmax.com', action: 'update', module: 'financeiro', description: 'Receita registrada: R$ 5.000,00', created_at: new Date(Date.now() - 14400000).toISOString() },
  ]

  const displayLogs = logs.length > 0 ? logs : mockLogs

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
          Log de Atividades
        </h2>
        <button onClick={loadLogs} style={{ backgroundColor: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Atualizar
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ textAlign: 'left', padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>Data/Hora</th>
              <th style={{ textAlign: 'left', padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>Usuário</th>
              <th style={{ textAlign: 'left', padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>Ação</th>
              <th style={{ textAlign: 'left', padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>Módulo</th>
              <th style={{ textAlign: 'left', padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {displayLogs.map((log, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontSize: '0.875rem', color: '#6b7280' }}>
                  {formatDate(log.created_at)}
                </td>
                <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                  {log.user || 'Sistema'}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    backgroundColor: getActionColor(log.action) + '20',
                    color: getActionColor(log.action)
                  }}>
                    {getActionLabel(log.action)}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: '#6b7280' }}>
                  {log.module}
                </td>
                <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {displayLogs.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Nenhuma atividade registrada
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', fontSize: '0.875rem', color: '#92400e' }}>
        <strong>Nota:</strong> O log de atividades mostra as principais ações realizadas no sistema. Para um histórico completo, configure a tabela activity_logs no Supabase.
      </div>
    </div>
  )
}
