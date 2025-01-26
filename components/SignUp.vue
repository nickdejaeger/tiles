<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        loading.value = true

        const { data, error: authError } = await supabase.auth.signUp({ 
            email: email.value,
            password: password.value
        })

        if (authError) throw new Error(authError.message)

        // Assuming the user's ID is the UUID
        const userId = data.user.id
        
        // Insert into profiles table
        const { error: insertError } = await supabase.from('profiles')
            .insert([{
                user_id: userId
            }])

        if (insertError) throw new Error(insertError.message)
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
            <h1>Sign UP</h1>
            <input type="email" placeholder="Your email" v-model="email" />
            <input type="password" placeholder="Your password" v-model="password" />
            <button
                class="btn"
                type="submit"
                :disabled="loading"
            >{{ loading ? 'Loading' : 'Sign UP' }}</button>
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
    background-color: rgba(0,0,0,.05);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    background-color: #7530e8;
    color: white;

    h1 {
        margin: 0;
    }

    input {
        display: inline-block;
        color: white;

        &::placeholder {
            color: #ffffff4d;
        }
    }
}
</style>