<script setup lang="ts">
    const user = useSupabaseUser()
</script>

<template>
    <Account v-if="user" />

    <div v-else class="auth-options">
        <SignUp />
        or
        <SignIn />
    </div>
</template>

<style scoped lang="scss">
.auth-options {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 8rem 2rem;
}
</style>