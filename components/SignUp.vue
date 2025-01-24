<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        loading.value = true

        const { data, error } = await supabase.auth.signUp({ 
            email: email.value,
            password: password.value
        })

        if (error) throw error

        // Assuming the user's ID is the UUID
        const userId = data.user.id

        console.log('User ID:', userId)
        
        // Insert into profiles table
        const { insertError } = await supabase
            .from('profiles')
            .insert({
                id: userId,  // UUID for the user
                created_at: new Date().toISOString()
            })

        if (insertError) throw insertError

        //alert('Signed UP!')
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
            <input
                type="submit"
                :value="loading ? 'Loading' : 'Sign UP'"
                :disabled="loading"
            />
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
    background-color: rgba(0,0,0,.1);
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    h1 {
        margin: 0;
    }

    input {
        display: inline-block;
    }
}
</style>