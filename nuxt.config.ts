// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: false,
        timeline: {
            enabled: false
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