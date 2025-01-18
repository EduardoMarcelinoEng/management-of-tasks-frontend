<script setup>
    const emit = defineEmits(["toFilter"]);
</script>

<style scoped>
    .btn-filter {
        background-color: var(--color-primary);
        height: min-content;
        color: white;

        &:hover {
            opacity: 0.85;
        }

        &:active {
            background-color: var(--color-primary);
            color: white;
        }
    }
</style>

<template>
    <nav class="navbar navbar-expand-md navbar-light">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <form>
                <div class="row">
                    <slot></slot>
                    <div class="col-md-3">
                        <div class="form-group d-flex h-100 align-items-center">
                            <button @click="emit('toFilter')" type="button" class="btn btn-filter">Filtrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </nav>
</template>