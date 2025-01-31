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
            <div>
                <div><NuxtLink to="/">Logo</NuxtLink></div>
                
            </div>
            <div>
                <ul>
                    <li><NuxtLink to="/admin">Admin</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li v-for="(link, index) in abc" :key="index">
                        <NuxtLink :to="link">{{ link.toUpperCase() }}</NuxtLink>
                    </li>
                </ul>
                <AppLogoutButton />
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    padding: .5rem 1rem;
    background: #FFF;
    z-index: 3;
    background: #F2F5F0;
    margin: 0 0 2rem;

    > div {
        display: flex;
        align-items: center;
        gap: 3rem;

        display: flex;
        align-items: center;
        justify-content: space-between;

        max-width: 1200px;
        margin: 0 auto;

        div {
            display: flex;
            align-items: center;
            gap: 1rem;
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

                color: #383835;
                font-size: .7rem;
                line-height: 1.742;

                a {
                    text-decoration: underline;
                    text-decoration-thickness: 1px;
                    text-underline-offset: 2px;
                }
            }
        }
    }

    

    button {
        border: 0;
        background-color: #e51919;
        color: white;
        border-radius: 0.25rem;
        padding: 0.15rem 0.25rem;
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