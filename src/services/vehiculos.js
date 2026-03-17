import { supabase } from '../lib/supabase.js';

export const vehiculosService = {
  async getAll() {
    const { data, error } = await supabase
      .from('vehiculos')
      .select('*')
      .order('marca', { ascending: true })
      .order('modelo', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async create(vehiculo) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('vehiculos')
      .insert({
        ...vehiculo,
        usuario_id: user.data.user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('vehiculos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async importFromCSV(vehiculos) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Usuario no autenticado');

    const vehiculosWithUser = vehiculos.map(v => ({
      ...v,
      usuario_id: user.data.user.id
    }));

    const { data, error } = await supabase
      .from('vehiculos')
      .insert(vehiculosWithUser)
      .select();

    if (error) throw error;
    return data;
  }
};
