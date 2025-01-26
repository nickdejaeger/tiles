<script setup>
    const { data: categories } = await useFetch(`/api/categories/categories`)
</script>

<template>
    <section>
        <h2>Categories List</h2>
        <table>
            <tbody>
                <tr v-for="(cat, index) in categories">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.name }}</td>
                    <td>{{ cat.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped lang="scss">
table {
    width: 100%;
    tr {
        background-color: #EEE;

        &:nth-of-type(odd) {
            background-color: #E3E3E3;
        }
    }
    td {
        font-size: 12px;
        padding: .25rem .5rem;
    }
}
</style>