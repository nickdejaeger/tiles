<script setup>
const { data: tiles } = await useFetch(`/api/tiles/tiles`)

const getCategoryById = (id) => {
    const { data: category } = useFetch(`/api/categories/${id}`)
    return category
}
</script>

<template>
    <section>
        <h2>Tiles List</h2>
        <div class="console">{{ getCategoryById(13) }}</div>
        <table>
            <tbody>
                <tr v-for="(tile, index) in tiles">
                    <td>{{ tile.id }}</td>
                    <td>{{ tile.title }}</td>
                    <td>{{ tile.created_at }}</td>
                    <td>
                        <div v-if="tile.category_ids.length" class="flex gap-1">
                            <span v-for="cat in tile.category_ids" class="tag">
                                {{ getCategoryById(cat) }}
                            </span>
                        </div>
                    </td>
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