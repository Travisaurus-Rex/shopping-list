import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxqpjbzwjqjbdybjhgsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cXBqYnp3anFqYmR5YmpoZ3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzA0NTgsImV4cCI6MjA2ODA0NjQ1OH0.3PT_5km8XNy2ar6wEz__IbmELPpyPoMXpITVqGuWcFA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
