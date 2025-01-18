<script>
  import Edit from "./_components/Edit.vue";

  export default {
    data(){
      return {
        idFilter: "",
        titleFilter: "",
        descriptionFilter: "",
        tagIdFilter: "",
        components:{
          'Edit': Edit
        }
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(location.search);
      this.idFilter = urlParams.get('id') || "";
      this.titleFilter = urlParams.get('title') || "";
      this.descriptionFilter = urlParams.get('description') || "";
      this.tagIdFilter = urlParams.get('tagId') || "";
    }
  }
</script>

<script setup>
  import http from "../../../services/http";
  const route = useRoute();
  const title = defineModel('title');
  const description = defineModel('description');
  const tagId = defineModel('tagId');
  const isLoading = useState('isLoading', ()=> true);
  const setLoading = newValue => isLoading.value = newValue;
  const tags = useState('tags', () => []);
  const tasks = useState('tasks', () => []);
  const currentPage = useState('currentPage', () => Number(route.query.currentPage) || 1);
  const quantifyOfPages = useState('quantifyOfPages', () => 0);
  const perPage = useState('perPage', () => 0);
  const form = useState('form', () => ({
    title: "",
    description: "",
    tagId: ""
  }));

  function setForm(obj) {
    form.value = Object.assign({}, form.value, obj);
  }

  definePageMeta({
    alias: "/admin/tarefas"
  });

  function fnActionConfirmInclude(){
    http.task.create({title: title.value, description: description.value, tagId: tagId.value}).then(async rawResponse=>{
      const content = await rawResponse.json();
      
      if(rawResponse.status >= 400){
        alert(content.message);
        return;
      }

      tasks.value = [...tasks.value, content]
    });
  }

  function fnActionConfirmEdit(tag){
    let obj = {}

    if(tag.title !== form.value.title) obj.title = form.value.title;
    if(tag.description !== form.value.description) obj.description = form.value.description;
    if(tag.tagId !== form.value.tagId) obj.tagId = form.value.tagId;

    http.task
      .update(tag.id, obj)
      .then(async rawResponse=>{
        const content = await rawResponse.json();
        if(rawResponse.status >= 400){
          alert(content.message);
          return;
        }

        tasks.value = tasks.value.map(t=>{
          if(t.id === tag.id){
            return Object.assign(t, content);
          }

          return t;
        });
      });
  }

  function fnActionConfirmDestroy(id){
    http.task.destroy(id).then(async rawResponse=>{
      const content = await rawResponse.json();
      
      if(rawResponse.status >= 400){
        alert(content.message);
        return;
      }

      tasks.value = tasks.value.filter(t=>t.id !== id);
    });
  }

  function onChange(key, value){
    form.value[key] = value;
  }

  function onCloseModalInclude(){
    form.value = {};
    title.value = "";
    description.value = "";
    tagId.value = "";
  }

  function onOpenModalEdit(data){
    form.value = data;
  }

  function onCloseModalEdit(){
    form.value = {};
  }

  function toFilter(search){

    setLoading(true);

    http.task.findAll({ currentPage: search.currentPage, id: search.id, title: search.title, description: search.description, tagId: search.tagId })
      .then(async rawResponse=>{
        const content = await rawResponse.json();
        
        if(rawResponse.status >= 400){
          alert(content.message);

          return;
        }

        await navigateTo({
          path: `/admin/tarefas`,
          query: Object.assign({}, content.meta, {
            title: search.title,
            description: search.description,
            tagId: search.tagId
          })
        });

        quantifyOfPages.value = Math.ceil(content.meta.total / content.meta.perPage);
        tasks.value = content.data;
        currentPage.value = content.meta.currentPage;

        perPage.value = content.meta.perPage;
      })
      .finally(()=>setLoading(false));
  }

  if(process.client){
    toFilter({
      currentPage: route.query.currentPage,
      id: route.query.id,
      title: route.query.title,
      description: route.query.description,
      tagId: route.query.tagId
    });
    
    http.tag.findAll()
      .then(async rawResponse=>{
        const content = await rawResponse.json();
        
        if(rawResponse.status >= 400){
          alert(content.message);

          return;
        }

        tags.value = content;
      });
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<template>
  <div class="page-content">
    <AppFilter @toFilter="toFilter({ currentPage: 1, id: idFilter, title: titleFilter, description: descriptionFilter, tagId: tagIdFilter })">
      <div class="col-md-2">
        <div class="form-group mb-3">
          <label for="inputIdFilter">Id</label>
          <input
            v-model="idFilter"
            type="text"
            class="form-control shadow-none"
            id="inputIdFilter"
          >
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group mb-3">
          <label for="inputTitleFilter">Título</label>
          <input
            v-model="titleFilter"
            type="text"
            class="form-control shadow-none"
            id="inputTitleFilter"
          >
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group mb-3">
          <label for="inputDescriptionFilter">Descrição</label>
          <input
            v-model="descriptionFilter"
            type="text"
            class="form-control shadow-none"
            id="inputDescriptionFilter"
          >
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group mb-3">
          <label for="inputTagFilter">Tag</label>
          <select class="form-select shadow-none" v-model="tagIdFilter" id="inputTagFilter">
            <option value=""></option>
            <option v-for="tag in tags" v-bind:key="tag.id" v-bind:value="tag.id">{{ tag.name }}</option>
          </select>
        </div>
      </div>
    </AppFilter>
    <AppModal
      :id="'include-task'"
      :textCTA="'Incluir'"
      :title="'Incluir tarefa'"
      @fnActionConfirm="fnActionConfirmInclude"
      @onClose="onCloseModalInclude"
    >
      <div class="mb-3">
        <label for="formControlInputTitle" class="form-label">Título</label>
        <input v-model="title" type="text" class="form-control shadow-none" id="formControlInputTitle" placeholder="Digite o título da tarefa">
      </div>
      <div class="mb-3">
        <label for="formControlInputDescription" class="form-label">Descrição</label>
        <textarea v-model="description" type="text" rows="3" class="form-control shadow-none" id="formControlInputDescription" placeholder="Digite a descrição da tarefa" />
      </div>
      <div class="mb-3">
        <label for="formControlInputTag" class="form-label">Tag</label>
        <select id="formControlInputTag" v-model="tagId" class="form-select shadow-none">
            <option selected>Selecione a tag</option>
            <option v-bind:value="tag.id" v-for="tag in tags" v-bind:key="tag.id">{{ tag.name }}</option>
        </select>
      </div>
    </AppModal>
    <div v-if="isLoading" class="loading mt-3">
      <div class="spinner-border" role="status"></div>
    </div>
    <p class="mt-3" v-if="!isLoading && !tasks.length">Não há dados para exibir.</p>
    <table v-if="!isLoading && tasks.length" class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Título</th>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          {{ task.message }}
          <th scope="row">{{ task.id }}</th>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.tag?.name }}</td>
          <td class="actions">
            <AppModal
              :id="`edit-task-${ task.id }`"
              :textCTA="'Editar'"
              :title="'Editar tarefa'"
              @onClose="onCloseModalEdit"
              @onOpen="onOpenModalEdit(task)"
              @fnActionConfirm="fnActionConfirmEdit(task)"
            >
              <Edit :tagId="task.tagId" :id="task.id" :tags="tags" @setForm="setForm" :title="form.title" :description="form.description"></Edit>
            </AppModal>
            <AppModal
              :id="`remove-task-${ task.id }`"
              :textCTA="'Deletar'"
              :title="'Deletar tarefa'"
              :isDanger="true"
              @fnActionConfirm="fnActionConfirmDestroy(task.id)"
            >
              Deseja deletar a tarefa {{ task.id }}?
            </AppModal>
          </td>
        </tr>
      </tbody>
    </table>
    <AppPagination
      v-if="quantifyOfPages > 1"
      :search="{ currentPage, id: idFilter, title: titleFilter, description: descriptionFilter, tagId: tagIdFilter }"
      :quantifyOfPages="quantifyOfPages"
      @toFilter="toFilter"
    />
  </div>
</template>