<script setup>
    const props = defineProps(['title', 'description', 'tags', 'id', 'tagId']);
    const emit = defineEmits(['setForm']);

    function onChange(n, v){
        emit("setForm", {
            [n]: v
        });
    }

</script>

<template>
    <form>
        <div class="mb-3">
            <label v-bind="{ for: `formControlInputTitle-${id}` }" class="form-label">Título</label>
            <input v-bind="{ id: `formControlInputTitle-${id}` }" v-model="props.title" @change="onChange('title', $event.target.value)" type="text" class="form-control shadow-none" placeholder="Digite o título da tarefa">
        </div>
        <div class="mb-3">
            <label v-bind="{ for: `formControlInputDescription-${id}` }" class="form-label">Descrição</label>
            <textarea rows="3" v-bind="{ id: `formControlInputDescription-${id}` }" v-model="props.description" @change="onChange('description', $event.target.value)" type="text" class="form-control shadow-none" placeholder="Digite a descrição da tarefa" />
        </div>
        <div class="mb-3">
            <label v-bind="{ for: `formControlInputTag-${id}` }" class="form-label">Tag</label>
            <select v-bind="{ id: `formControlInputTag-${id}`, value: tagId }" class="form-select shadow-none" @change="onChange('tagId', $event.target.value)">
                <option v-bind:value="''" selected>Selecione a tag</option>
                <option v-bind:value="tag.id" v-for="tag in props.tags" v-bind:key="tag.id">{{ tag.name }}</option>
            </select>
        </div>
    </form>
</template>