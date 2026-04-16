// src/services/aseguradoras.js
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
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.status === 404) {
        throw new Error(`Compañía con ID ${id} no encontrada`);
      } else {
        throw error;
      }
    }

    const { data: updatedData, error: updateError } = await supabase
      .from('aseguradoras')
      .update(aseguradora)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updatedData;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('aseguradoras')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.status === 404) {
        throw new Error(`Compañía con ID ${id} no encontrada`);
      } else {
        throw error;
      }
    }

    const { error: deleteError } = await supabase
      .from('aseguradoras')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
  }
};
