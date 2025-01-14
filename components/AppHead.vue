<script setup>
    function handleClick() {
        localStorage.clear();

        navigateTo({
            path: '/login'
        });
    }
</script>

<template>
    <header>
        <ul>
            <li>
                <nuxt-link to="/admin/tags">
                    Tags
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/admin/tarefas">
                    Tarefas
                </nuxt-link>
            </li>
        </ul>
        <div class="actions">
            <button @click="handleClick" type="button" class="btn btn-danger btn-sm">Sair</button>
        </div>
    </header>
</template>

<style>
    header {
        padding: 0.65rem;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul {
            display: flex;
            list-style-type: none;
            margin: 0;

            li {
                &:not(:last-child) {
                    margin-right: 1rem;
                }

                text-transform: uppercase;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }

        .btn {
            text-transform: uppercase;
        }

        background-color: var(--color-main);
    }
</style>