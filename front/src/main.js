import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)
router.beforeEach(async(to, from) => {
    if (
        // make sure the user is authenticated
        //   !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'login'
    ) {
        // redirect the user to the login page
        return { name: 'login' }
    }
})

app.use(router)

app.mount('#app')