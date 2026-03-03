import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hviopjozlkvhnsevotdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aW9wam96bGt2aG5zZXZvdGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjUsImV4cCI6NjE2MjA0ODEyNjQ1fQ.6_IECVgYhvQ5FZbLuE2SF-Pkmd33LwWXK4f1AJGEZ2M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
