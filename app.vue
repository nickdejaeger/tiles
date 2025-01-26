<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="scss">
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
}
@media (min-width: 768px) {
    body {
        padding-top: 6rem;
    }
}
label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 1rem .25rem;
    color: #333;
}
input {
    border: 0;
    outline: 0;
    padding: .75rem 1rem;
    border-radius: 99999px;
    font-size: 18px;
    background-color: rgba(0,0,0,.05);

    &:disabled {
        opacity: .5;
    }
}
button {
    border: 0;
    outline: 0;
    padding: 0.75rem 1rem;
    border-radius: 99999px;
    font-size: 18px;
    cursor: pointer;
    background-color: blue;
    color: white;
}
h1 {
    font-size: 3rem;
    font-weight: 600;
}
h2 {
    font-size: 2rem;
    font-weight: 600;
}
h3 {
    font-size: 1.8rem;
    font-weight: 400;
}
.tag {
    display: inline-block;
    font-family: monospace;
    font-size: 10px;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: #000;
    color: #FFF;
    padding: .35rem .45rem;
    border-radius: .35rem;
}
.console {
    position: relative;
    margin: 1rem 0;
    background-color: #ff00001f;
    border: 2px dashed red;
    padding: 3rem 1rem 1rem 1rem;
    border-radius: 1rem;

    &::before {
        content: "Testing:";
        position: absolute;
        top: 17px;
        left: 15px;
        font-size: 12px;
        font-style: italic;
    }
}
</style>