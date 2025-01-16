<script setup>
    const props = defineProps(['name']);
    const emit = defineEmits(['setForm']);

    function onChange(n, v){
        emit("setForm", {
            [n]: v
        });
    }

</script>

<template>
    <div class="mb-3">
        <label for="formControlInputName" class="form-label">Nome</label>
        <input v-model="props.name" @change="onChange('name', $event.target.value)" type="text" class="form-control shadow-none" id="formControlInputName" placeholder="Digite o nome da tag">
    </div>
</template>