<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('nickdejaeger@hotmail.com')
const password = ref('testtest')

const handleLogin = async () => {
    try {
        loading.value = true
        const { data, error } = await supabase.auth.signInWithPassword({ 
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        if (!error) await navigateTo('/')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section>
        <form @submit.prevent="handleLogin">
            <h1>Sign IN</h1>
            <input type="email" placeholder="Your email" v-model="email" />
            <input type="password" placeholder="Your password" v-model="password" />
            <button
            class="btn"
                type="submit"
                :disabled="loading"
            >{{ loading ? 'Loading' : 'Sign IN' }}</button>
        </form>
    </section>
</template>

<style scoped lang="scss">
section {
    display: flex;
}
form {
    display: inline-block;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    background-color: #a5ffa5;

    h1 {
        margin: 0;
    }

    input {
        display: inline-block;

        &::placeholder {
            color: #0000004d;
        }
    }
}
</style>