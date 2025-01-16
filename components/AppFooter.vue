<script setup>
    import moment from "moment";

    const yearCurrent = moment().format("YYYY");
</script>


<style scoped>
    footer {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #24231E;
        padding: 1rem 0;

        @media (min-width: 600px) {
            padding: 0;
        }

        p {
            text-align: center;
            color: white;

            a {
                color: var(--color-primary);
            }

            @media (min-width: 600px) {
                br {
                    display: none;
                }
            }

            margin: 0;
        }
    }
</style>

<template>
    <footer>
        <p>Desenvolvido por <a target="_blank" href="https://eduardomarcelinodev.com.br/meus-projetos">Eduardo Marcelino</a> © {{yearCurrent}}. <br> Todos os direitos reservados.</p>
    </footer>
</template>