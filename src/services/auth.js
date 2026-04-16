import { supabase } from '../lib/supabase.js';

export const authService = {
  async signUp(email, password, nombre, cargo) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          cargo
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user.id,
          email: authData.user.email,
          password: '',
          nombre,
          cargo
        });

      if (profileError) throw profileError;
    }

    return authData;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        await callback(event, session);
      })();
    });
  }
};
