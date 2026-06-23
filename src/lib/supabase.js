import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están configuradas.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);"// Trigger actualizacion vars: 14:55" 
