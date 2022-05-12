<script setup>
import { RouterLink, RouterView } from 'vue-router'

import {useRouter} from 'vue-router'
import { useUserStore } from './stores/user'


const router = useRouter()
const userStore = useUserStore()

function disconnect(){
  userStore.disconnect();
  router.push('/login')
}
</script>

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
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/posts" v-if="userStore.isAuthenticated" class="nav-link active">Posts</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/register" v-if="!userStore.isAuthenticated" class="nav-link active">Register</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" v-if="!userStore.isAuthenticated" class="nav-link active">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" v-if="userStore.isAuthenticated" class="nav-link active" @click="disconnect">Disconnect</RouterLink>
        </li>
       
      </ul>
    
    </div>
  </div>
</nav>

     
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

</style>
