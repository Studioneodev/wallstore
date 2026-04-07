import { supabase } from './supabaseClient'

export const clientService = {
  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_admin', false)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async getStats() {
    const { data, error } = await supabase
      .from('users')
      .select('id, created_at')
      .eq('is_admin', false)
    if (error) throw error
    
    const now = new Date()
    const thisMonth = data.filter(u => {
      const created = new Date(u.created_at)
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
    })
    
    return {
      total: data.length,
      thisMonth: thisMonth.length
    }
  },

  async search(query) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_admin', false)
      .ilike('email', `%${query}%`)
    if (error) throw error
    return data || []
  }
}
