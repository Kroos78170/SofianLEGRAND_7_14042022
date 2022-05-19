<template>
  <main>
       <h1>Post</h1>
    <section>
        <h4>{{post.firstname}} {{post.lastname}}</h4>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <p>Posté le {{post.date}} à {{post.time}}</p>
    </section>
    <section>
      <div v-for="comment in comments" class="card m-2" style="width: 70%" :key="comment.id" >
        <div class="card-body">
          <h4 class="card-title">{{comment.firstname}}{{comment.lastname}}</h4> 
          <p class="card-text">{{comment.content}}</p>
          <p>Posté le {{comment.date}} à {{comment.time}}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { comment } from 'postcss';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
 import { useApiService } from '../composable/apiService'

 const apiService = useApiService()

const post = ref([]);
const comments = ref([])
const route = useRoute();

onMounted(async () => {
  const id = route.params.id
  //tu dois récuperer l'id dans les parametre d'url
        post.value = await apiService.getOnePost(id)
        comment.value = await apiService.getComments(id)
    })
        

</script>