<script setup>
import http from "../services/http";

definePageMeta({
  layout: false,
  alias: "/registro"
});

const email = defineModel('email');
const name = defineModel('name');
const password = defineModel('password');
const repeatPassword = defineModel('repeatPassword');

const clearInputs = ()=>{
    email.value = "";
    name.value = "";
    password.value = "";
    repeatPassword.value = "";
}

function handleClick(e) {
    e.target.disabled = true;

    if(password.value !== repeatPassword.value){
        alert("Senhas diferem!");

        e.target.disabled = false;

        return;
    }
        http.user.create({
            email: email.value,
            password: password.value,
            name: name.value
        }).then(async rawResponse=>{
            const content = await rawResponse.json();
            
            if(rawResponse.status >= 400){
                alert(content.message);
                return;
            }

            clearInputs();
            alert("Usuário criado com sucesso!");
            navigateTo('/login');
        })
        .catch(error=>{
            alert(error.message);
        })
        .finally(()=>e.target.disabled = false);
}
</script>

<template>
    <div class="center">
        <div class="content-center">
            <form>
                <h2>Nova conta</h2>
                <div class="form-group mb-3">
                    <label for="inputEmail">E-mail</label>
                    <input v-model="email" type="email" class="form-control shadow-none" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o seu e-mail">
                </div>
                <div class="form-group mb-3">
                    <label for="inputName">Nome</label>
                    <input v-model="name" type="text" class="form-control shadow-none" id="inputName" aria-describedby="emailHelp" placeholder="Digite o seu nome">
                </div>
                <div class="form-group mb-3">
                    <label for="inputPassword">Senha</label>
                    <input v-model="password" type="password" class="form-control shadow-none" id="inputPassword" placeholder="Digite a sua senha">
                </div>
                <div class="form-group mb-3">
                    <label for="inputRepeatPassword">Repita a senha</label>
                    <input v-model="repeatPassword" type="password" class="form-control shadow-none" id="inputRepeatPassword" placeholder="Repita a sua senha">
                </div>
                <button type="button" @click="handleClick" class="btn btn-primary">Criar</button>
                <div class="link">
                    <nuxt-link to="/login">
                        Login
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

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--color-main);
    
        .content-center {
            width: 95%;
            background-color: #FBFBFD;
            padding: 3em;
            border-radius: 18px;

            @media (min-width: 430px) {
                max-width: 380px;
                width: 100%;
            }

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