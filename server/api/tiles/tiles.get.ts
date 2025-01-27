import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://lfasxebowcjdtueluxgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXN4ZWJvd2NqZHR1ZWx1eGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MzkzMzAsImV4cCI6MjA1MzMxNTMzMH0.ZVd64DylhV3K-hDGPKbGX7FCYKeNc6ZC9XT0nbpxiss'
const supabase = createClient(supabaseUrl, supabaseKey)

export default defineEventHandler(async () => {
    const { data, error } = await supabase
        .from('tiles')
        .select('*')
        .order('created_at', { ascending: false })

    return data
})