import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default defineEventHandler((event) => {
    
    const id = getRouterParam(event, 'id')

    return supabase
        .from('categories')
        .select('name')
        .eq('id', id)
        .single()
        .then(({data: cat, error}) => {
            if (error || !cat) {
                throw createError({ statusCode: 404, statusMessage: 'Category not found' })
            }
            return cat.name
        })
})