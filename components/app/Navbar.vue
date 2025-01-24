<script setup lang="ts">
const abc = ref({
    1: 'a',
    2: 'b',
    3: 'c'
});
</script>

<template>
    <nav>
        <div>
            <div><NuxtLink to="/">HOME</NuxtLink></div>
            <ul>
                <li v-for="(link, index) in abc" :key="index">/ <NuxtLink :to="link">{{ link.toUpperCase() }}</NuxtLink></li>
            </ul>
        </div>
        <div>MENU</div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.5rem 3rem;
    background: #FFF;
    z-index: 3;

    div {
        display: flex;
        align-items: flex-start;
        gap: 3rem;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;

        li {
            display: inline-flex;
            gap: .5rem;
        }
    }
}
</style>