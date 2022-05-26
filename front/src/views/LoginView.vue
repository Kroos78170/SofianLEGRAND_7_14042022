<template>
    <h1>Login</h1>
    <section class="d-flex container justify-content-center align-items-center ">
       <form @submit.prevent="login" class="bg-light p-5 container justify-content-center align-items-center">
            <p v-if="error" class="text-danger">{{errorMessage}}</p>
           <div class="mb-3">
                <label for="email" class="form-label">Email </label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-success" :class="disabled">Valider</button>
            </div>

       </form>
       </section>
</template>

<script setup>
    import {ref, computed} from 'vue'

    import {useRouter} from 'vue-router'

    import {useUserStore} from '@/stores/user'

    const router = useRouter()

    const email = ref('')
    const password = ref('')
    let error = ref(false)
    let errorMessage = ref('')
    const userStore = useUserStore()

    const disabled = computed(() => ({
        disabled: email.value == '' ||  password.value == ''
    }))

    async function login(){
        const data = await userStore.login(email, password)
        if (data.error) {
                error.value = true
                errorMessage.value = data.error    
            } else {
                error.value = false
                errorMessage.value = ''
            
                router.push('/posts')
            }    
    }

</script>
