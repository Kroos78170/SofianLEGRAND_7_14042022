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
 const email = ref('')
 const password = ref('')
 let error = ref(false)
 let errorMessage = ref('')


 console.log(email.value)

 const disabled = computed(() => ({
  disabled: email.value == '' ||  password.value == ''
}))

function login(){
    //vérifier les infos du formulaire
    console.log("login")
    const myHeaders = new Headers();
 
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({email: email.value, password: password.value})
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.error){
            error.value = true
            errorMessage.value = data.error   
        }else{
            error.value = false
            errorMessage.value = ''  
        }
    }   
    )
}
 //au click suyr le bouton valider

// on envoi les infos au backend
// reception de la reponse du backend


</script>