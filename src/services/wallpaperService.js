import { supabase } from './supabaseClient'

export const wallpaperService = {
  async getAll() {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getActive() {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(wallpaper) {
    const { data, error } = await supabase
      .from('wallpapers')
      .insert([wallpaper])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id, wallpaper) {
    const { data, error } = await supabase
      .from('wallpapers')
      .update({ ...wallpaper, updated_at: new Date() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('wallpapers')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`
    const filePath = `wallpapers/${fileName}`
    
    const { data, error } = await supabase.storage
      .from('wallpapers')
      .upload(filePath, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('wallpapers')
      .getPublicUrl(filePath)
    
    return { publicUrl, filePath }
  },

  async deleteImage(filePath) {
    const { error } = await supabase.storage
      .from('wallpapers')
      .remove([filePath])
    if (error) throw error
  }
}
