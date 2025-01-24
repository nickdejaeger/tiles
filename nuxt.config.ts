// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },

    modules: ['@nuxtjs/supabase'],

    supabase: {
        redirect: true,
        redirectOptions: {
            login: '/',
            callback: '/confirm',
            include: undefined,
            exclude: [],
            cookieRedirect: false,
        }
    }
})