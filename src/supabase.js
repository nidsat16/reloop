import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hviopjozlkvhnsevotdz.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_wSPZi8Mm73e8ciTYE8iUKA_aEDY-IAe";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
