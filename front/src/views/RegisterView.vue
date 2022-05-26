<template>
     <h1>Register</h1>
    <section class="d-flex container  flex-wrap">
       <form @submit.prevent="register" class="bg-light p-5 container justify-content-center align-items-center">
            <p v-if="error" class="text-danger">{{errorMessage}}</p>
            <div class="mb-3">
                <label for="lastname" class="form-label">Nom</label>
                <input type="text" class="form-control" id="lastName"  v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="firstname" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName">
            </div>
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

    const lastName = ref('')
    const firstName = ref('')
    const email = ref('')
    const password = ref('')
    let error = ref(false)
    let errorMessage = ref('')
    const userStore = useUserStore()
    
    const disabled = computed(() => ({
        disabled: lastName.value == '' || firstName.value =='' || email.value == '' ||  password.value == ''
    }))

    async function register(){
        const data = await userStore.register(lastName, firstName, email, password)
        if (data.error) {
                error.value = true
                errorMessage.value = data.error    
            } else {
                error.value = false
                errorMessage.value = ''
            
                router.push({
                    "name": "login"
                })
            }    
    }

</script>
