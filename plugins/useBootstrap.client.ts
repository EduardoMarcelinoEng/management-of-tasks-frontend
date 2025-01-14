import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
export default defineNuxtPlugin(() => {
    return {
        provide: {
            bootstrap: bootstrap
        }
    }
})