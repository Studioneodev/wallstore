import { supabase } from './supabaseClient'

export const taskService = {
  async getAll() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(task) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id, task) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...task, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async updateStatus(id, status) {
    const updates = { status, updated_at: new Date() }
    if (status === 'concluida') {
      updates.completed_at = new Date()
    }
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async getByStatus(status) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', status)
      .order('due_date', { ascending: true })
    if (error) throw error
    return data
  },

  async getByPriority(priority) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('priority', priority)
      .order('due_date', { ascending: true })
    if (error) throw error
    return data
  },

  async getStats() {
    const { data, error } = await supabase
      .from('tasks')
      .select('status, priority')
    if (error) throw error
    
    const stats = {
      total: data.length,
      pendente: data.filter(t => t.status === 'pendente').length,
      em_progresso: data.filter(t => t.status === 'em_progresso').length,
      concluida: data.filter(t => t.status === 'concluida').length,
      alta: data.filter(t => t.priority === 'alta').length,
      urgente: data.filter(t => t.priority === 'urgente').length
    }
    return stats
  }
}