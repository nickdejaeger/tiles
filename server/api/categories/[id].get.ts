import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://supabase-url.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'supabase-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const { data: cat } = await supabase
        .from('categories')
        .select('name')
        .eq('id', id)
        .single()
    
    if (!cat) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Category not found: ' + cat
        })
    }
    
    return cat.name
})