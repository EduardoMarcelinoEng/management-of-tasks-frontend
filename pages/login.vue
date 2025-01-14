<script setup>
    definePageMeta({
        layout: false,
    });

    import moment from "moment";

    if(process.client){
        const isLogged = (()=>{
            const tokenExpiresAt = localStorage.getItem("token_expiresAt");
            if(!tokenExpiresAt) return false;

            return moment(tokenExpiresAt).format("YYYY-MM-DD HH:mm:ss") >= moment().format("YYYY-MM-DD HH:mm:ss");
        })();

        if(isLogged){
            navigateTo({
                path: '/admin/tags'
            });
        }
    }

    const email = defineModel('email');
    const password = defineModel('password');

    function handleClick(e) {
        e.target.disabled = true;

        fetch("http://localhost:3333/user/auth", {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.value, password: password.value})
        })
            .then(async rawResponse=>{
                const content = await rawResponse.json();
                
                if(rawResponse.status >= 400){
                    alert(content.message);
                    return;
                }

                localStorage.setItem("token", content.value);
                localStorage.setItem("token_expiresAt", content.expiresAt.toString());

                navigateTo('/admin/tags');
            })
            .finally(()=>e.target.disabled = false);
    }

// const emailEl = document.getElementById("inputEmail");
// const passwordEl = document.getElementById("inputPassword");

// document.querySelector("button").addEventListener("click", e=>{
//     e.preventDefault();

//     e.target.disabled = true;

//     fetch("/user/auth", {
//         method: 'POST',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({email: emailEl.value, password: passwordEl.value})
//     })
//         .then(async rawResponse=>{
//             const content = await rawResponse.json();
            
//             if(rawResponse.status >= 400){
//                 alert(content.message);
//                 return;
//             }

//             localStorage.setItem("token", content.value);
//             localStorage.setItem("token_expiresAt", content.expiresAt.toString());

//             window.location.href = "/admin";
//         })
//         .finally(()=>e.target.disabled = false);
// });
</script>

<template>
    <div class="center">
        <div class="content-center">
            <form>
                <img src="/img/logo-black.png" >
                <div class="form-group mb-3">
                    <label for="inputEmail">E-mail</label>
                    <input
                        v-model="email"
                        type="email"
                        class="form-control shadow-none"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Digite o seu e-mail"
                    >
                </div>
                <div class="form-group mb-3">
                    <label for="inputPassword">Senha</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control shadow-none"
                        id="inputPassword"
                        placeholder="Digite a sua senha"
                    >
                </div>
                <button type="button" @click="handleClick" class="btn btn-primary">Entrar</button>
                <div class="link">
                    <nuxt-link to="/registro">
                        Criar conta
                    </nuxt-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

    .link {
        display: flex;
        justify-content: flex-end;

        a {
            color: var(--color-primary);
        }
    }

    body {
        background-color: var(--color-main);
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--color-main);
    
        .content-center {
            max-width: 380px;
            width: 100%;
            background-color: #FBFBFD;
            padding: 3em;
            border-radius: 18px;

            form {
                img {
                    width: 100%;
                    margin-bottom: 0.5rem;
                }

                label {
                    color: var(--color-font);
                }

                input:focus {
                    border-color: var(--color-primary);
                }

                .btn {
                    width: 100%;
                    background-color: var(--color-primary);
                    border: none;
                    text-transform: uppercase;
                }
            }
        }
    }
</style>
