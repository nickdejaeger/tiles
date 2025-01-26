<template>
    <section class="dashboard">
        <AdminPanelCategoriesList class="dashboard__panel" />
        <AdminPanelCategoriesAdd class="dashboard__panel" />
        <AdminPanelTilesList class="dashboard__panel" />
    </section>
</template>

<style lang="scss">
.dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;

    &__panel {
        display: flex;
        flex-direction: column;

        padding: 2rem;
        border: 1px solid #DDD;

        h2 {
            margin-bottom: 2rem;
        }
    }
}
</style>