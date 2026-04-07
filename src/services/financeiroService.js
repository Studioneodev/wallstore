import { supabase } from './supabaseClient'

export const financeiroService = {
  async getReceitas(filters = {}) {
    let query = supabase.from('receitas').select('*').order('date', { ascending: false })
    
    if (filters.startDate) query = query.gte('date', filters.startDate)
    if (filters.endDate) query = query.lte('date', filters.endDate)
    if (filters.category) query = query.eq('category', filters.category)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getDespesas(filters = {}) {
    let query = supabase.from('despesas').select('*').order('date', { ascending: false })
    
    if (filters.startDate) query = query.gte('date', filters.startDate)
    if (filters.endDate) query = query.lte('date', filters.endDate)
    if (filters.category) query = query.eq('category', filters.category)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createReceita(receita) {
    const { data, error } = await supabase
      .from('receitas')
      .insert([receita])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateReceita(id, receita) {
    const { data, error } = await supabase
      .from('receitas')
      .update(receita)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deleteReceita(id) {
    const { error } = await supabase.from('receitas').delete().eq('id', id)
    if (error) throw error
  },

  async createDespesa(despesa) {
    const { data, error } = await supabase
      .from('despesas')
      .insert([despesa])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateDespesa(id, despesa) {
    const { data, error } = await supabase
      .from('despesas')
      .update(despesa)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deleteDespesa(id) {
    const { error } = await supabase.from('despesas').delete().eq('id', id)
    if (error) throw error
  },

  async getResumo() {
    const [receitas, despesas] = await Promise.all([
      supabase.from('receitas').select('amount, received'),
      supabase.from('despesas').select('amount, paid')
    ])

    const totalReceitas = receitas.data
      .filter(r => r.received)
      .reduce((sum, r) => sum + parseFloat(r.amount), 0)
    
    const totalDespesas = despesas.data
      .filter(d => d.paid)
      .reduce((sum, d) => sum + parseFloat(d.amount), 0)

    const receitasPendentes = receitas.data
      .filter(r => !r.received)
      .reduce((sum, r) => sum + parseFloat(r.amount), 0)

    const despesasPendentes = despesas.data
      .filter(d => !d.paid)
      .reduce((sum, d) => sum + parseFloat(d.amount), 0)

    return {
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
      receitasPendentes,
      despesasPendentes
    }
  },

  async getFluxoMensal(year) {
    const startDate = `${year}-01-01`
    const endDate = `${year}-12-31`

    const [receitas, despesas] = await Promise.all([
      supabase.from('receitas').select('amount, date, received').gte('date', startDate).lte('date', endDate),
      supabase.from('despesas').select('amount, date, paid').gte('date', startDate).lte('date', endDate)
    ])

    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const fluxo = meses.map((mes, index) => {
      const month = index + 1
      const rec = receitas.data
        .filter(r => new Date(r.date).getMonth() + 1 === month && r.received)
        .reduce((sum, r) => sum + parseFloat(r.amount), 0)
      const desp = despesas.data
        .filter(d => new Date(d.date).getMonth() + 1 === month && d.paid)
        .reduce((sum, d) => sum + parseFloat(d.amount), 0)
      return { mes, receitas: rec, despesas: desp, saldo: rec - desp }
    })

    return fluxo
  }
}