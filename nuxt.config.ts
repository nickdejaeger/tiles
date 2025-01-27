// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: false,
        timeline: {
            enabled: false
        }
    },

    runtimeConfig: {
		public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY
		}
    },

    modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],

    supabase: {
        redirect: true,
        redirectOptions: {
            login: '/login',
            callback: '/tiles',
            include: undefined,
            exclude: [],
            cookieRedirect: false,
        }
    }
})