<template>

    <h1>Posts</h1>
    <section class="d-flex container  flex-wrap">
        <div class="card m-2 " style="width: 30%;" v-for="post in posts" :key="post.id" >
            <img src="" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">{{post.title}}</h5>
                <p class="card-text">{{post.content}}</p>
                <a href="/post/:id" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </section>
</template>

<script setup>
import {ref, onMounted} from 'vue'

import { useApiService } from '../composable/apiService'

const apiService = useApiService()

 const posts= ref([
     {
         id: 1,
         title: 'titre1',
         content: "confojfosdjfosdjfs",
         date: '12/10/2022',
         time: '12:00',
         firstname: 'sofian',
         lastname: 'Legrand',
         urlImage: 'htttp://localhost:3000/images.images.png'
     },
     {
         id: 2,
         title: 'titre1',
         content: "confojfosdjfosdjfs",
         date: '12/10/2022',
         time: '12:00',
         firstname: 'sofian',
         lastname: 'Legrand',
         urlImage: 'htttp://localhost:3000/images.images.png'
     },
     {
         id: 3,
         title: 'titre1',
         content: "confojfosdjfosdjfs",
         date: '12/10/2022',
         time: '12:00',
         firstname: 'sofian',
         lastname: 'Legrand',
         urlImage: 'htttp://localhost:3000/images.images.png'
     },
     {
         id: 4,
         title: 'titre1',
         content: "confojfosdjfosdjfs",
         date: '12/10/2022',
         time: '12:00',
         firstname: 'sofian',
         lastname: 'Legrand',
         urlImage: 'htttp://localhost:3000/images.images.png'
     },
     {
         id: 5,
         title: 'titre1',
         content: "confojfosdjfosdjfs",
         date: '12/10/2022',
         time: '12:00',
         firstname: 'sofian',
         lastname: 'Legrand',
         urlImage: 'htttp://localhost:3000/images.images.png'
     }
 ])



onMounted(() => {
  apiService.getPosts()
})


</script>