import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hviopjozlkvhnsevotdz.supabase.co';
const supabaseAnonKey = 'sb_publishable_wSPZi8Mm73e8ciTYE8iUKA_aEDY-IAe';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
