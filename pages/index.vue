<script setup lang="ts">
definePageMeta({
    layout: 'grid'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

let LIMIT = ref<number>(50);
let NEXT_LOAD = ref<number>(20);

let max = ref<number>(0);
let ended = ref<boolean>(false);

const dbTiles = ref<object | null>(null);
const error = ref<string | null>(null);

const userId = ref<string | null>(null);

const fetchTiles = async () => {
    try {
        const { data, error } = await supabase
            .from('tiles')
            .select(`id, title`)
            .order('created_at', { ascending: false })

        if (data) {
            dbTiles.value = data.slice(0, LIMIT.value);
            max.value = data.length;
        }
        return data
    } catch (error) {
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
    if (user.value) {
        console.log('index.vue: ' + user.value.id);
        userId.value = user.value.id
    } else {
        console.error('User is not logged in');
    }

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
        <TilesTile v-for="(tile, index) in dbTiles"
            :key="index"
            :id="tile.id"
            :title="tile.title"
            :profileId="userId"
        >
            {{ tile.title }}
        </TilesTile>
    </TilesGrid>

    <div class="data-info" v-if="ended">
        <div>All <b>{{ max }}</b> tiles are loaded</div>
    </div>
</template>






<style scoped lang="scss">
.btn-delete {
    z-index: 9;
    border: 0;
    background-color: transparent;
    color: red;
    border-radius: .5rem;
    padding: 0;
    cursor: pointer;
    font-size: 13px;

    svg {
        stroke: red;
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