<script setup lang="ts">
defineProps({
    id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: 'placeholder'
    },
    status: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <article class="tile" :class="(status ? 'active' : '')">
        <slot />
        <span>id: {{ id }}</span>
        <header>
            <div>{{ title }}</div>
        </header>
        <nav>
            <button>Dislike</button>
            <button>Like</button>
        </nav>
    </article>
</template>

<style scoped lang="scss">
.tile {
    position: relative;
    outline: 0;
    border: 0;
    border-radius: 3rem 1rem;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: rgb(233, 233, 233);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    cursor: pointer;
    font-size: 16px;
    animation: fadeIn .5s ease-in-out .25s forwards;

    span {
        font-size: 11px;
        font-weight: 600;
        color: #555;
        text-transform: uppercase;
        position: absolute;
        top: .5rem;
        left: 50%;
        translate: -50%;
    }

    header {
        position: relative;
        text-align: center;
        border-radius: 999999px;
        pointer-events: none;
        z-index: 1;
        font-size: 24px;
        font-weight: 600;
    }

    nav {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        button {
            outline: 0;
            border: 0;
            padding: 0;
            position: absolute;
            width: 140%;
            height: 100%;
            border-radius: 0;
            font-size: 0;
            cursor: pointer;
            transition: background-color 0.3s;

            &:first-of-type {
                transform: rotate(-45deg) translateX(-10%) translateY(-64%) scale(1);
                background-color: rgba(255, 0, 0, 0.2117647059);

                &:hover {
                    background-color: rgba(255, 0, 0, 0.4117647059);
                }
            }

            &:last-of-type {
                transform: rotate(-45deg) translateX(-10%) translateY(36%) scale(1);
                background-color: rgb(1 255 0 / 21%);

                &:hover {
                    background-color: rgb(1 255 0 / 41%);
                }
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>