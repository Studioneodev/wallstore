import { supabase } from './supabaseClient'

export const financialService = {
  async getRevenueByPeriod(startDate, endDate) {
    let query = supabase
      .from('orders')
      .select('created_at, total_amount, status')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    const { data, error } = await query
    if (error) throw error

    const paid = data.filter(o => o.status === 'paid')
    const total = paid.reduce((sum, o) => sum + parseFloat(o.total_amount), 0)

    return {
      total,
      orders: paid.length,
      details: data
    }
  },

  async getMonthlyRevenue(year) {
    const { data, error } = await supabase
      .from('orders')
      .select('created_at, total_amount, status')
      .eq('status', 'paid')
      .gte('created_at', `${year}-01-01`)
      .lte('created_at', `${year}-12-31`)

    if (error) throw error

    const monthly = {}
    for (let i = 1; i <= 12; i++) {
      monthly[i] = 0
    }

    data.forEach(order => {
      const month = new Date(order.created_at).getMonth() + 1
      monthly[month] += parseFloat(order.total_amount)
    })

    return monthly
  },

  async getDailyRevenue(days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('orders')
      .select('created_at, total_amount, status')
      .eq('status', 'paid')
      .gte('created_at', startDate.toISOString())

    if (error) throw error

    const daily = {}
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = date.toISOString().split('T')[0]
      daily[key] = 0
    }

    data.forEach(order => {
      const key = order.created_at.split('T')[0]
      if (daily[key] !== undefined) {
        daily[key] += parseFloat(order.total_amount)
      }
    })

    return daily
  },

  async getSummary() {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount, created_at')

    if (error) throw error

    const paid = data.filter(o => o.status === 'paid')
    const pending = data.filter(o => o.status === 'pending')
    const cancelled = data.filter(o => o.status === 'cancelled')

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const thisMonth = paid.filter(o => new Date(o.created_at) >= startOfMonth)

    return {
      totalRevenue: paid.reduce((sum, o) => sum + parseFloat(o.total_amount), 0),
      pendingAmount: pending.reduce((sum, o) => sum + parseFloat(o.total_amount), 0),
      cancelledAmount: cancelled.reduce((sum, o) => sum + parseFloat(o.total_amount), 0),
      thisMonthRevenue: thisMonth.reduce((sum, o) => sum + parseFloat(o.total_amount), 0),
      totalOrders: data.length,
      paidOrders: paid.length,
      pendingOrders: pending.length
    }
  }
}
