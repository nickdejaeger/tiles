import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://supabase-url.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'supabase-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export default defineEventHandler(async (event) => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false })

    return data
})