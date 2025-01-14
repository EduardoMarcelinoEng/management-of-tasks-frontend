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

<template>
    <div>
        <AppHead />
        <slot />
        <AppFooter />
    </div>
</template>