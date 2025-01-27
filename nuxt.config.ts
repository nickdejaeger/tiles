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
            supabaseUrl: "https://lfasxebowcjdtueluxgw.supabase.co",
            supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXN4ZWJvd2NqZHR1ZWx1eGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MzkzMzAsImV4cCI6MjA1MzMxNTMzMH0.ZVd64DylhV3K-hDGPKbGX7FCYKeNc6ZC9XT0nbpxiss"
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