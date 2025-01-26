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
    bottom: 0;
    left: 50%;
    translate: -50%;
    background-color: rgba(255, 255, 255, 0.75);
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 4rem;
    z-index: 1;
    border: 1px solid #c8c8c8;
    border-bottom: none;
    border-radius: 1rem 1rem 0 0;
    background-color: #000000;
    color: #FFF;
    box-shadow: 0 0 30px -15px black;

    h2, h3 {
        margin: 0;
    }
}
</style>