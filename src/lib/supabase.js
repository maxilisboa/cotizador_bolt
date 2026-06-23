import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xuisqgaijknpryuzwmwz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aXNxZ2FpamtucHJ5dXp3bXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDc1MTYsImV4cCI6MjA4OTI4MzUxNn0.jElhsSz2ao9c-J7khL5j4ZfGIth2jtzVbgwlX3HIq_c';
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iffotcbhpmstpymddvzb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZm90Y2JocG1zdHB5bWRkdnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTk4MjAsImV4cCI6MjA5MjI5NTgyMH0.IhwBUNSwfAilyIZdIoeoZ6BYIklidZpmavhew4UtF2Y';
>>>>>>> origin/dev/supabase-propio

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
