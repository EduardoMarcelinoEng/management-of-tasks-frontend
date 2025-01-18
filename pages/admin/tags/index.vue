<script>
  import Edit from "./_components/Edit.vue";

  export default {
    data(){
      return {
        components:{
          'Edit':Edit
        }
      }
    }
  }
</script>

<script setup>
  import http from "../../../services/http";
  const name = defineModel('name');
  const isLoading = useState('isLoading', ()=> true);
  const setLoading = newValue => isLoading.value = newValue;
  const tags = useState('tags', () => []);
  const form = useState('form', () => ({
    name: ""
  }));

  function setForm(obj) {
    form.value = Object.assign({}, form.value, obj);
  }

  function fnActionConfirmInclude(){
    http.tag.create({name: name.value}).then(async rawResponse=>{
      const content = await rawResponse.json();
      
      if(rawResponse.status >= 400){
        alert(content.message);
        return;
      }

      tags.value = [...tags.value, content]
    });
  }

  function fnActionConfirmEdit(tag){
    let obj = {}

    if(tag.name !== form.value.name) obj.name = form.value.name;

    http.tag.update(tag.id, obj).then(async rawResponse=>{
      const content = await rawResponse.json();
      
      if(rawResponse.status >= 400){
        alert(content.message);
        return;
      }

      tags.value = tags.value.map(t=>{
        if(t.id === tag.id){
          return Object.assign(t, content);
        }

        return t;
      });
    });
  }

  function fnActionConfirmDestroy(id){
    http.tag.destroy(id).then(async rawResponse=>{
      const content = await rawResponse.json();
      
      if(rawResponse.status >= 400){
        alert(content.message);
        return;
      }

      tags.value = tags.value.filter(t=>t.id !== id);
    });
  }

  function onChange(key, value){
    form.value[key] = value;
  }

  function onCloseModalInclude(){
    form.value = {};
    name.value = "";
  }

  function onOpenModalEdit(data){
    form.value = data;
  }

  function onCloseModalEdit(){
    form.value = {};
  }

  if(process.client){
    http.tag.findAll()
      .then(async rawResponse=>{
        const content = await rawResponse.json();
        
        if(rawResponse.status >= 400){
          alert(content.message);

          return;
        }

        tags.value = content;
      })
      .finally(()=>setLoading(false));
  }
</script>

<template>
  <div class="page-content">
    <AppModal
      :id="'include-tag'"
      :textCTA="'Incluir'"
      :title="'Incluir tag'"
      @fnActionConfirm="fnActionConfirmInclude"
      @onClose="onCloseModalInclude"
    >
      <div class="mb-3">
        <label for="formControlInputName" class="form-label">Nome</label>
        <input v-model="name" type="text" class="form-control shadow-none" id="formControlInputName" placeholder="Digite o nome da tag">
      </div>
    </AppModal>
    <div v-if="isLoading" class="loading mt-3">
      <div class="spinner-border" role="status"></div>
    </div>
    <p class="mt-3" v-if="!isLoading && !tags.length">Não há dados para exibir.</p>
    <table v-if="!isLoading && tags.length" class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tags" :key="tag.id">
          {{ tag.message }}
          <th scope="row">{{ tag.id }}</th>
          <td>{{ tag.name }}</td>
          <td class="actions">
            <AppModal
              :id="`edit-tag-${ tag.id }`"
              :textCTA="'Editar'"
              :title="'Editar tag'"
              @onClose="onCloseModalEdit"
              @onOpen="onOpenModalEdit(tag)"
              @fnActionConfirm="fnActionConfirmEdit(tag)"
            >
              <Edit @setForm="setForm" :name="form.name"></Edit>
            </AppModal>
            <AppModal
              :id="`remove-tag-${ tag.id }`"
              :textCTA="'Deletar'"
              :title="'Deletar tag'"
              :isDanger="true"
              @fnActionConfirm="fnActionConfirmDestroy(tag.id)"
            >
              Deseja deletar a tag {{ tag.id }}?
            </AppModal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>