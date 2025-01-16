<script setup>
const modalEl = ref(null);
const props = defineProps(['isDanger', 'id', 'title', 'textCTA']);

const emit = defineEmits(['fnActionConfirm', 'onClose', 'onOpen']);

if(process.client){
    setTimeout(()=>{
        modalEl.value.addEventListener("hidden.bs.modal", function() {
            emit('onClose');
        });

        modalEl.value.addEventListener("show.bs.modal", function() {
            emit('onOpen');
        });
    }, 1000);
}

const fnCloseModal = () => {
    if(process.client){
        const modal = bootstrap.Modal.getInstance(modalEl.value);
        modal.hide();
    }
};

const fnConfirm = () => {
    fnCloseModal();

    emit('fnActionConfirm');
}

defineExpose({
    modalEl
})

</script>

<style>
    body {
        /* &:not(.modal-open) {
            .modal-backdrop {
                display: none;
            }
        } */
    }
    
    .modal-body {
        input:focus {
            border-color: var(--color-primary);
        }
    }

    .btn {
        border: 0;

        &.cta {
            background-color: var(--color-primary);
            
            &:hover {
                opacity: 0.85;
            }

            &:active {
                background-color: var(--color-primary);
            }
        }

        &.danger {
            background-color: var(--color-danger) !important;
        }
    }
</style>

<template>
    <v-fragment>
        <!-- Button trigger modal -->
        <button type="button" v-bind:class="'btn btn-primary btn-sm cta' + (isDanger ? ' danger' : '')" data-bs-toggle="modal" v-bind:data-bs-target="'#'+id+'-modal'">
            {{ textCTA }}
        </button>

        <!-- Modal -->
        <div ref="modalEl" class="modal fade" v-bind:id="id+'-modal'" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                    <button @click="fnConfirm" type="button" v-bind:class="'btn btn-primary cta' + (isDanger ? ' danger' : '')">{{ textCTA }}</button>
                </div>
                </div>
            </div>
        </div>
    </v-fragment>
</template>