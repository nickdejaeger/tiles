<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
    try {
        loading.value = true
        const user = useSupabaseUser()

        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
        })
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section>
        <form @submit.prevent="updateProfile">
            <div>
                <label for="email">Email</label>
                <input id="email" type="text" :value="user.email" disabled />
            </div>
            <div>
                <label for="username">Username</label>
                <input id="username" type="text" v-model="username" />
            </div>
            <div>
                <label for="website">Website</label>
                <input id="website" type="url" v-model="website" />
            </div>
            <div>
                <input
                    type="submit"
                    class="button primary block"
                    :value="loading ? 'Loading ...' : 'Update'"
                    :disabled="loading"
                />
            </div>
        </form>
    </section>
</template>

<style scoped lang="scss">
section {
    padding: 2rem;
    margin: 2rem 0;
    background-color: red;
}
</style>