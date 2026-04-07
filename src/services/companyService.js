import { supabase } from './supabaseClient'

export const companyService = {
  async getAll() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(company) {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id, company) {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...company, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async toggleActive(id, isActive) {
    const { data, error } = await supabase
      .from('companies')
      .update({ is_active: isActive, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  }
}