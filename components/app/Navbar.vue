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
                <li><NuxtLink to="/admin">Admin</NuxtLink></li>/
                <li><NuxtLink to="/about">About</NuxtLink></li>
                <li v-for="(link, index) in abc" :key="index">/ <NuxtLink :to="link">{{ link.toUpperCase() }}</NuxtLink></li>
            </ul>
        </div>
        <div>
            <AppLogoutButton />
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 3rem;
    background: #FFF;
    z-index: 3;
    background-color: #f5d4da;
    margin: 0 0 2rem;

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

    button {
        border: 0;
        background-color: #e51919;
        color: white;
        border-radius: 0.25rem;
        padding: 0.35rem 0.5rem;
        cursor: pointer;
        font-size: 13px;


        &:hover {
            background-color: red;
        }
    }
}


@media (min-width: 768px) {
    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
}
</style>