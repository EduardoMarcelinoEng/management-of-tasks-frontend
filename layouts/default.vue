<script setup>
    import moment from "moment";

    if(process.client){
        const isLogged = (()=>{
            const tokenExpiresAt = localStorage.getItem("token_expiresAt");
            if(!tokenExpiresAt) return false;

            return moment(tokenExpiresAt).format("YYYY-MM-DD HH:mm:ss") >= moment().format("YYYY-MM-DD HH:mm:ss");
        })();

        if(!isLogged){
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