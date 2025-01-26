<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) await navigateTo('/login')
}
</script>

<template>
    <button v-if="user" @click="signOut">Sign Out</button>
</template>