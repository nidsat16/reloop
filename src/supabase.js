import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ncanqaylixfopollggqj.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_mQ7uoVh-Z3daTa2ac9bvzg_o3ief37J";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);