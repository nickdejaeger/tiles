<script setup lang="ts">
const route = useRoute()
const letter = route.params.letter as string

let limit = ref<number>(50);
let max = ref<number>(0);
let ended = ref<boolean>(false);

const words = ref<string[] | null>(null);
const error = ref<string | null>(null);

const fetchWords = () => {
    fetch(`/content/words/${letter}.json`)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Filter out words with less than 4 characters
            const filteredWords = Object.keys(data).filter(word => word.length >= 4);
            words.value = filteredWords.slice(0, limit.value);
            // Count max number of words
            max.value = Object.keys(data).length;
        })
        .catch((err) => {
            error.value = `Error fetching JSON file for letter <b>${letter.toUpperCase()}</b>: ${err.message}`;
        });
}

fetchWords();

const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has reached the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 50) {
        if (limit.value >= max.value) {
            ended.value = true;
            return;
        }
        limit.value += 50;
        fetchWords();
    }
};

// Listen for scroll event when component is mounted
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// Remove the scroll event listener when the component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <h1>Tiles for {{ letter.toUpperCase() }}</h1>
    
    <p v-if="!words && !error">Loading...</p>
    <p v-if="error" v-html="error"></p>

    <TilesGrid v-if="words">
        <TilesTile v-for="(word, index) in words" :key="index" :title="word" />
    </TilesGrid>

    <div class="data-info" v-if="ended">
        <div>All <b>{{ max }}</b> tiles are loaded</div>
    </div>
</template>

<style scoped lang="scss">
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
</style>