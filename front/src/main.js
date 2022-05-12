import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'

const app = createApp(App)

app.use(router)

app.use(createPinia())

router.beforeEach(async(to, from) => {
    const userStore = useUserStore()
    const isAuthenticated = userStore.isAuthenticated
    userStore.verifyConnectedUser()
    if (!isAuthenticated && (to.name == 'posts') || (to.name == 'post') || (to.name == 'moderation')) {
        // redirect the user to the login page
        return { name: 'login' }
    } else if (isAuthenticated && (to.name == 'register' || to.name == 'login')) {
        return { name: 'posts' }
    }
})


app.mount('#app')