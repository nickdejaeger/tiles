<script setup lang="ts">
    import words from '~/content/words/a.json';

    const min = 0;
    const max = Object.keys(words).length;

    const wordsArray = Object.keys(words).slice(3000, 4000);

    console.log(min, max);
</script>

<template>
    <TilesGrid>
        <TilesTile v-for="(word, index) in wordsArray" :key="index" :title="word" />
    </TilesGrid>
</template>