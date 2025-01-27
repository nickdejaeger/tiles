import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default defineEventHandler(async () => {
    const { data, error } = await supabase
        .from('tiles')
        .select('*')
        .order('created_at', { ascending: false })

    return data
})