import { supabase } from '../lib/supabase.js';

export const polizasService = {
  async getAll() {
    const { data, error } = await supabase
      .from('polizas')
      .select(`
        *,
        aseguradora:aseguradoras(id, nombre, comision_porcentaje),
        vendedor:vendedores(id, nombre, comision_porcentaje)
      `)
      .order('fecha', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(poliza) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('polizas')
      .insert({
        ...poliza,
        usuario_id: user.data.user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, poliza) {
    const { data, error } = await supabase
      .from('polizas')
      .update(poliza)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('polizas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getStats() {
    const { data, error } = await supabase
      .from('polizas')
      .select('monto');

    if (error) throw error;

    const total = data?.reduce((sum, p) => sum + parseFloat(p.monto || 0), 0) || 0;
    const count = data?.length || 0;

    return { total, count };
  }
};
