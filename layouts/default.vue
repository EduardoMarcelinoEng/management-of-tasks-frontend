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
    .page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;

        main {
            height: 100%;
            width: 90%;
            padding: 3rem 0;
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