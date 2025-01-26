<template>
    <div class="tiles">
        <slot />
    </div>
</template>

<style>
.tiles {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-gap: 0.5rem;
    gap: 1rem;
    margin: 1rem;
}

@media (min-width: 320px) {
    .tiles {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
}
@media (min-width: 460px) {
    .tiles {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }
}
@media (min-width: 600px) {
    .tiles {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }
}
@media (min-width: 860px) {
    .tiles {
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }
}
@media (min-width: 1200px) {
    .tiles {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }
}
@media (min-width: 1700px) {
    .tiles {
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(7, 1fr);
    }
}
@media (min-width: 2200px) {
    .tiles {
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }
}
@media (min-width: 2400px) {
    .tiles {
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
    }
}
</style>