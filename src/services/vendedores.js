import { supabase } from '../lib/supabase.js';

export const vendedoresService = {
  async getAll() {
    const { data, error } = await supabase
      .from('vendedores')
      .select('*')
      .order('nombre');

    if (error) throw error;
    return data || [];
  },

  async create(vendedor) {
    const { data, error } = await supabase
      .from('vendedores')
      .insert([vendedor])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, vendedor) {
    const { data, error } = await supabase
      .from('vendedores')
      .update(vendedor)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('vendedores')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
