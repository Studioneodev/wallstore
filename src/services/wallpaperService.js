import { supabase } from './supabaseClient'

export const wallpapersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
    if (error) throw error
    return data || []
  },

  async getActive() {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('is_active', true)
    if (error) throw error
    return data || []
  },

  async create(wallpaper) {
    console.log('Creating wallpaper:', wallpaper)
    
    const { data, error } = await supabase
      .from('wallpapers')
      .insert([wallpaper])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    return data[0]
  },

  async update(id, wallpaper) {
    const { data, error } = await supabase
      .from('wallpapers')
      .update(wallpaper)
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
    
    const { data: urlData } = supabase.storage
      .from('wallpapers')
      .getPublicUrl(filePath)
    
    return { publicUrl: urlData.publicUrl, filePath }
  }
}

export const wallpaperService = wallpapersService
