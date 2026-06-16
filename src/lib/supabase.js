import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iffotcbhpmstpymddvzb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZm90Y2JocG1zdHB5bWRkdnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTk4MjAsImV4cCI6MjA5MjI5NTgyMH0.IhwBUNSwfAilyIZdIoeoZ6BYIklidZpmavhew4UtF2Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
