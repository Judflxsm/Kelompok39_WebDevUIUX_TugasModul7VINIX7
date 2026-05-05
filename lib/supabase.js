// lib/supabase.js
// Supabase client — gunakan satu instance untuk seluruh app
// Docs: https://supabase.com/docs/reference/javascript

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Environment variable NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diset.\n' +
    'Buat file .env.local di root project dan isi kedua variable tersebut.'
  )
}

// Singleton — hindari re-instantiate di setiap request
export const supabase = createClient(supabaseUrl, supabaseAnonKey)