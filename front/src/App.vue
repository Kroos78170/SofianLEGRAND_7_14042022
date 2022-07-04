<template>
  <header>
    

    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/posts" v-if="userStore.isAuthenticated" class="nav-link">Posts</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/register" v-if="!userStore.isAuthenticated" class="nav-link">Register</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" v-if="!userStore.isAuthenticated" class="nav-link">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" v-if="userStore.isAuthenticated" class="nav-link" @click="disconnect">Disconnect</RouterLink>
        </li>
         <li class="nav-item" v-if="userStore.isAuthenticated">
          <a  class="nav-link">{{fullName}}</a>
        </li>
       
      </ul>
    
    </div>
  </div>
</nav>

     
    </div>
  </header>
  <main class="container">
  <RouterView />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useApiService } from './composable/apiService'

import {useRouter} from 'vue-router'
import { useUserStore } from './stores/user'

const apiService = useApiService()
const router = useRouter()
const userStore = useUserStore()

// const user = ref( userStore.getUser)

const fullName = computed( () => 
  userStore.isAuthenticated ? userStore.userData.fullName : null

  
)

function disconnect(){
  userStore.disconnect();
  router.push('/login')
}

 onMounted(async () => {
        // user.value = userStore.userData
        // console.log(user.value)
    })
</script>

<style>
@import '@/assets/base.css';

</style>
