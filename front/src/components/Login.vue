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
import {useApiService} from '../composable/apiService'
import {useRouter} from 'vue-router'
import {useLocalStorageService} from '../composable/localStorageService'

const apiService = useApiService()
const router = useRouter()
const localStorageService = useLocalStorageService()
 const email = ref('')
 const password = ref('')
 let error = ref(false)
 let errorMessage = ref('')

 const disabled = computed(() => ({
  disabled: email.value == '' ||  password.value == ''
}))

async function login(){
    const data = await apiService.login(error, errorMessage)
    console.log(data)
     if (data.error) {
            error.value = true
            errorMessage.value = data.error
            
        } else {
            error.value = false
            errorMessage.value = ''
           localStorageService.setItems(JSON.parse(data).token, JSON.parse(data).user);
            router.push('/posts')
        }    
}

</script>