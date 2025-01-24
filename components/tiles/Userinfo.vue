<template>
    <header>
        <div>
            <h2>Nick De Jaeger</h2>
            <em>Lorem ipsum dolor</em>
        </div>
        <div>
            <div>
                <h3>Followers</h3>
            </div>
            <div>
                <h3>Following</h3>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50%;
    background-color: rgba(255, 255, 255, .75);
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 4rem;
    z-index: 1;

    h2, h3 {
        margin: 0;
    }
}
</style>