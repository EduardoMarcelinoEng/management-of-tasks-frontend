<script setup>
    const props = defineProps(["search", "quantifyOfPages"]);
    const emit = defineEmits(["toFilter"]);
</script>

<style scoped>
    .active>.page-link {
        --bs-pagination-active-bg: var(--color-primary);
        --bs-pagination-active-border-color: var(--color-primary);
    }

    .page-link {
        --bs-pagination-color: var(--color-primary);
        --bs-pagination-hover-color: var(--color-primary);
        --bs-pagination-focus-color: var(--color-primary);
    }

    .page-link:focus {
        box-shadow: none !important;
        border-color: transparent !important;
    }

    .page-item.active {
        background-color: var(--color-primary);
    }
</style>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm">
            <li class="page-item">
                <button v-bind:disabled="search.currentPage === 1" class="page-link" @click="emit('toFilter', Object.assign({}, props.search, { currentPage: props.search.currentPage - 1 }))">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li @click="emit('toFilter', Object.assign({}, props.search, { currentPage: page }))" v-for="page in quantifyOfPages" v-bind:key="page" v-bind:class="'page-item' + (page === search.currentPage ? ' active' : '')"><a class="page-link" href="#">{{page}}</a></li>
            <li class="page-item">
                <button v-bind:disabled="search.currentPage === quantifyOfPages" class="page-link" @click="emit('toFilter', Object.assign({}, props.search, { currentPage: props.search.currentPage + 1 }))">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>