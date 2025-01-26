<script setup lang="ts">
definePageMeta({
    layout: 'grid'
})

const supabase = useSupabaseClient()

let LIMIT = ref<number>(50);
let NEXT_LOAD = ref<number>(20);

let max = ref<number>(0);
let ended = ref<boolean>(false);

const dbTiles = ref<object | null>(null);
const error = ref<string | null>(null);
const tileStatus = ref<string | null>(null);
const newTile = ref<string>('')


const fetchTiles = async () => {
    try {
        // Look if record exists
        const { data, error } = await supabase
            .from('tiles')
            .select(`id, title`)
            .order('created_at', { ascending: false })

        dbTiles.value = data.slice(0, LIMIT.value);
        // Count max number of words
        max.value = data.length;

        return data
    } catch (error) {
        console.log('Catch error: ', error)
    }
}








const addTile = async (title: string) => {
    try {
        // Look if record exists
        const { data: findRecord, error } = await supabase
            .from('tiles')
            .select("*")
            .eq('title', title);

        if (findRecord?.length === 0) {
            tileStatus.value = 'anim-tile-added';
        }

        if (findRecord?.length !== 0) {
            tileStatus.value = 'anim-tile-exists';
        }

        setTimeout(() => {
            tileStatus.value = null;
        }, 1000);

        // If record does not exist
        if (findRecord?.length === 0) {
            const { error } = await supabase
                .from('tiles')
                .insert([{ title: title}], { ignoreDuplicates: true })

            fetchTiles()
        }

        // Empty field for new input
        newTile.value = ''
    } catch (error) {
        console.log('Catch error: ', error)
    }
}

const deleteTile = async (id: number) => {
    try {
        const response = await supabase
            .from('tiles')
            .delete()
            .eq('id', id)

        fetchTiles()
        //console.log('Delete response: ', response.status)
    }
    catch (error) {
        console.log('Catch error: ', error)
    }
}





const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has reached the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 50) {
        if (LIMIT.value >= max.value) {
            ended.value = true;
            return;
        }
        LIMIT.value += NEXT_LOAD.value;
        fetchTiles();
    }
};


// Listen for scroll event when component is mounted
onMounted(() => {
    fetchTiles()
    window.addEventListener('scroll', handleScroll);
});
// Remove the scroll event listener when the component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>







<template>
    <p v-if="!dbTiles && !error">Loading...</p>
    <p v-if="error" v-html="error"></p>

    <TilesGrid v-if="dbTiles">
        <form :class="tileStatus">
            <input type="text" name="" id="" v-model="newTile">
            <button @click.prevent="addTile(newTile)">Add</button>
        </form>
        <TilesTile v-for="(tile, index) in dbTiles" :key="index" :id="tile.id" :title="tile.title">
            <button class="btn-delete" @click="deleteTile(tile.id)">Delete</button>
        </TilesTile>
    </TilesGrid>

    <div class="data-info" v-if="ended">
        <div>All <b>{{ max }}</b> tiles are loaded</div>
    </div>
</template>






<style scoped lang="scss">
form {
    position: relative;
    border-radius: 3rem 1rem;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: rgb(233, 233, 233);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 16px;

    input {
        width: 100%;
        margin-bottom: 1rem;
        text-align: center;
    }
}

.btn-delete {
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 9;
    border: 0;
    background-color: #e51919;
    color: white;
    border-radius: .5rem;
    padding: 0.35rem 0.5rem;
    cursor: pointer;
    font-size: 13px;


    &:hover {
        background-color: red;
    }
}

.data-info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    color: rgba(0,0,0,.65);
    font-style: italic;

    b {
        color: rgba(0,0,0,.7);
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