import { createClient, SupabaseClient } from '@supabase/supabase-js';

const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

const supabase:SupabaseClient<any, "public", any> = client;

export default supabase;
