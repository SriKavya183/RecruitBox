import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(
  url &&
    anonKey &&
    !url.includes('your-project') &&
    !anonKey.includes('your-anon-key'),
)

if (!hasSupabaseConfig) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and add your project keys.')
}

export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder')
