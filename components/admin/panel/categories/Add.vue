<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(false)
const categoryQueryMsg = ref({
    msg: '',
    class: ''
});

const newCategoryName = ref('')
const categoriesData = ref({})

const getCategories = async () => {
    try {
        loading.value = true

        const { data, error } = await supabase
            .from('categories')
            .select("*")
            .order('name', { ascending: true });
        categoriesData.value = data
    } catch (error) {
        console.log('Catch error: ', error)
    } finally {
        loading.value = false
    }
}
categoriesData.value = getCategories()



const addCategory = async (name) => {
    try {
        loading.value = true

        if (name) {
            const { data: findRecord, error } = await supabase
                .from('categories')
                .select("*")
                .eq('name', name);
            
            if (findRecord?.length === 0) {
                const { error } = await supabase
                    .from('categories')
                    .insert([{ name: name}], { ignoreDuplicates: true })

                categoryQueryMsg.value = {
                    msg: 'Category added.',
                    class: 'text-green-500'
                }

                categoriesData.value = getCategories()
                
                newCategoryName.value = ''
            }
            else {
                categoryQueryMsg.value = {
                    msg: 'This Category already exists.',
                    class: 'text-red-500'
                }
            }
        }
        else {
            categoryQueryMsg.value = {
                msg: 'Please enter a category name.',
                class: 'text-red-500'
            }
        }

        newCategoryName.value = ''
    } catch (error) {
        console.log('Catch error: ', error)
    } finally {
        loading.value = false

        setTimeout(() => {
            categoryQueryMsg.value = {
                msg: '',
                class: ''
            }
        }, 3000);
    }
}
</script>

<template>
    <section>
        <h2>Add Category</h2>
        <form @submit.prevent="addCategory(newCategoryName)">
            <div class="w-full">
                <label for="newCategoryName">Category name</label>
                <div class="flex flex-row">
                    <input id="newCategoryName" type="text" v-model="newCategoryName" />
                    <button
                        type="submit"
                        :disabled="loading"
                    >{{ loading ? 'Loading ...' : 'Add categroy' }}</button>
                </div>
            </div>
            <div class="status"><div v-if="categoryQueryMsg.msg" :class="categoryQueryMsg.class">{{ categoryQueryMsg.msg }}</div></div>
            <div class="selector">
                <div>All categories</div>
                <select multiple>
                    <option v-for="categroy in categoriesData" :value="categroy.id">{{ categroy.name }}</option>
                </select>
            </div>
        </form>
    </section>
</template>

<style scoped lang="scss">
section {
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