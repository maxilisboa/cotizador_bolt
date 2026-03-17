import { supabase } from '../lib/supabase.js';

export const aseguradorasService = {
  async getAll() {
    const { data, error } = await supabase
      .from('aseguradoras')
      .select('*')
      .order('nombre');

    if (error) throw error;
    return data || [];
  },

  async create(aseguradora) {
    const { data, error } = await supabase
      .from('aseguradoras')
      .insert([aseguradora])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, aseguradora) {
    const { data, error } = await supabase
      .from('aseguradoras')
      .update(aseguradora)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('aseguradoras')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
