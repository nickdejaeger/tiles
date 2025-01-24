<script setup lang="ts">
    import tiles from '~/content/tiles.json';
    import words from '~/content/words_dictionary.json';

    const min = 0;
    const max = Object.keys(words).length;

    const wordsArray = Object.keys(words).slice(3000, 4000);

    console.log(min, max);
</script>

<template>
    <TilesGrid>
        <TilesTile v-for="(word, index) in wordsArray" :key="index" :title="word" />
        <TilesTile
            v-for="(tile, index) in tiles.tiles"
            :key="index"
            :title="tile.title"
            :status="tile.active"
        />
    </TilesGrid>
</template>