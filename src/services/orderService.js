import { supabase } from './supabaseClient'

export const orderService = {
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*, users(email)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getByUser(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateStatus(id, status, paidAt = null) {
    const update = { status }
    if (paidAt) update.paid_at = paidAt
    
    const { data, error } = await supabase
      .from('orders')
      .update(update)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async getStats() {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount')
    if (error) throw error
    
    const total = data.reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    const paid = data.filter(o => o.status === 'paid').reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    const pending = data.filter(o => o.status === 'pending').reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    const count = data.length
    
    return { total, paid, pending, count }
  }
}
