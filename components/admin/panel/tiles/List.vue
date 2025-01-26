<script setup lang="ts">
const supabase = useSupabaseClient()

const tilesList = ref();
const tileStatus = ref<string | null>(null);
const newTile = ref<string>('')

const fetchTiles = async () => {
    try {
        const { data, error } = await supabase
            .from('tiles')
            .select('*')
            .order('created_at', { ascending: false })

        tilesList.value = data
    } catch (error) {
        console.log('Catch error: ', error)
    }
}

const getCategoryById = (id) => {
    const { data: category } = useFetch(`/api/categories/${id}`)
    return category
}

const addTile = async (title) => {
    try {
        // field not empty
        if (title) {
            const { data: findRecord, error } = await supabase
                .from('tiles')
                .select("*")
                .eq('title', title);

            if (findRecord?.length === 0) {
                const { error } = await supabase
                    .from('tiles')
                    .insert([{ title: title}], { ignoreDuplicates: true })

                if (!error) fetchTiles()

                tileStatus.value = 'anim-tile-added';
            }
            else {
                tileStatus.value = 'anim-tile-exists';
            }
        }
        else {
            tileStatus.value = 'anim-tile-exists';
        }

        setTimeout(() => {
            tileStatus.value = null;
        }, 1000);

        // Empty field for new input
        newTile.value = ''
    } catch (error) {
        console.log('Catch error: ', error)
    }
}

const deleteTile = async (id) => {
    try {
        const response = await supabase
            .from('tiles')
            .delete()
            .eq('id', id)

        fetchTiles()
        console.log(id)
    }
    catch (error) {
        console.log('Catch error: ', error)
    }
}

onMounted(() => {
    fetchTiles()
});
</script>

<template>
    <section>

        <form :class="tileStatus" class="pb-8">
            <input type="text" name="" id="" v-model="newTile" placeholder="Add tile">
            <button @click.prevent="addTile(newTile)" class="btn">Add</button>
        </form>

        <table>
            <tbody>
                <tr v-for="tile in tilesList">
                    <td>{{ tile.id }}</td>
                    <td>{{ tile.title }}</td>
                    <td>{{ tile.created_at }}</td>
                    <td>
                        <div v-if="tile.category_ids.length" class="flex flex-wrap gap-1">
                            <span v-for="cat in tile.category_ids" class="tag">
                                {{ getCategoryById(cat) }}
                            </span>
                        </div>
                    </td>
                    <td>
                        <button @click="deleteTile(tile.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped lang="scss">
table {
    width: 100%;
    tr {
        background-color: #EEE;

        &:nth-of-type(odd) {
            background-color: #E3E3E3;
        }
    }
    td {
        font-size: 12px;
        padding: .25rem .5rem;
    }
}



.anim-tile-added {
    animation: anim-tile-added 1s ease-in-out forwards;
}
.anim-tile-exists {
    animation: anim-tile-exists 1s ease-in-out forwards;
}
@keyframes anim-tile-added {
    0% {
        transform: scale(1);
        background-color: #00ff0069;
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
        background-color: rgb(233, 233, 233);
    }
}
@keyframes anim-tile-exists {
    0% {
        transform: rotate(-5deg);
        background-color: #ff000069;
    }
    50% {
        transform: rotate(5deg);
    }
    100% {
        transform: rotate(0deg);
        background-color: rgb(233, 233, 233);
    }
}
</style>