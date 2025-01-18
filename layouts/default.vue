<script setup>
    import moment from "moment";
    import { jwtDecode } from "jwt-decode";
    import utils from "../utils";

    if(process.client){
        if(!utils.isLogged()){
            navigateTo({
                path: '/login'
            });
        }
    }
</script>

<style>
  input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--color-primary) !important;
  }

    .page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;

        main {
            min-height: calc(100vh - 135px);

            @media (min-width: 600px) {
                min-height: calc(100vh - 79px);
            }
            width: 90%;
            padding: 3rem 0;
        }
    }

    table {
        tr {
            .actions {
                .btn {
                    margin-right: 0.5rem;
                }
            }
        }
    }
</style>

<template>
    <div class="page">
        <AppHead />
        <main>
            <slot />
        </main>
        <AppFooter />
    </div>
</template>