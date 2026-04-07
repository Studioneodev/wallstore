import { supabase } from './supabaseClient'

export const contactService = {
  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(contact) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id, contact) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ ...contact, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async updatePipelineStage(id, pipeline_stage) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ pipeline_stage, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async getByStatus(status) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getByPipelineStage(stage) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('pipeline_stage', stage)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getStats() {
    const { data, error } = await supabase
      .from('contacts')
      .select('status, pipeline_stage')
    if (error) throw error
    
    const stats = {
      total: data.length,
      lead: data.filter(c => c.status === 'lead').length,
      cliente: data.filter(c => c.status === 'cliente').length,
      inativo: data.filter(c => c.status === 'inativo').length,
      novo: data.filter(c => c.pipeline_stage === 'novo').length,
      qualificado: data.filter(c => c.pipeline_stage === 'qualificado').length,
      proposta: data.filter(c => c.pipeline_stage === 'proposta').length,
      ganho: data.filter(c => c.pipeline_stage === 'ganho').length,
      perdido: data.filter(c => c.pipeline_stage === 'perdido').length
    }
    return stats
  }
}