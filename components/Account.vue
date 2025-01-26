<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)

const street = ref('')
const street_nr = ref('')
const postal = ref('')
const state = ref('')

const { data } = await supabase
  .from('profiles')
  .select(`street, street_nr, postal, state`)
  .eq('user_id', user.value.id)
  .single()

if (data) {
    street.value = data.street
    street_nr.value = data.street_nr
    postal.value = data.postal
    state.value = data.state
}

async function updateProfile() {
    try {
        loading.value = true

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                street: street.value,
                street_nr: street_nr.value,
                postal: postal.value,
                state: state.value,
                updated_at: new Date()
            })
            .eq('user_id', user.value.id)
        if (updateError) throw new Error('foo: ' + updateError.message)
    } catch (error) {
        if (error) throw new Error('bar: ' + error.message)
    } finally {
        loading.value = false
    }
}

</script>

<template>

    <div class="flex items-start gap-8 p-12">
        <section>
            <form @submit.prevent="updateProfile">
                <div>
                    <label for="email">Email</label>
                    <input id="email" type="text" :value="user.email" disabled />
                </div>
                <div>
                    <label for="street">Street</label>
                    <input id="street" type="text" v-model="street" />
                </div>
                <div>
                    <label for="street_nr">Street nr</label>
                    <input id="street_nr" type="text" v-model="street_nr" />
                </div>
                <div>
                    <label for="postal">Postal</label>
                    <input id="postal" type="text" v-model="postal" />
                </div>
                <div>
                    <label for="state">State</label>
                    <input id="state" type="text" v-model="state" />
                </div>
                <div>
                    <button
                        type="submit"
                        :disabled="loading"
                    >{{ loading ? 'Loading ...' : 'Update profile' }}</button>
                </div>
            </form>
        </section>
    </div>

</template>

<style scoped lang="scss">
section {
    display: inline-block;
    padding: 2rem 1rem;
    border: 1px solid #DDD;

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;

        div {
            display: flex;
            flex-direction: column;
        }

        button {
            margin-top: 1rem;
        }
    }
}

.selector {
    padding: 1rem;
    background-color: #EEE;
    width: 100%;
    border-radius: 1rem;

    > div {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: .5rem;
    }

    select {
        border-radius: .5rem;
        padding: .5rem;
        min-height: 300px;
    }
}
</style>