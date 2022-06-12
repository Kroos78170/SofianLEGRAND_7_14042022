<template>
       <h1>Post</h1>
    <section>
       <RouterLink :to="{ name: 'postForm' , params: { 'id' : id}}" class="btn btn-primary">Modifier</RouterLink>
        <h4>{{post.firstname}} {{post.lastname}}</h4>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <p>Posté le {{post.date}} à {{post.time}}</p>
    </section>
    <section>
      <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useApiService } from '../composable/apiService'
  import CommentCard from '../components/CommentCard.vue';

  const apiService = useApiService()

  const post = ref([]);
  const comments = ref([]);
  const route = useRoute();
  let id = ref(0)

  onMounted(async () => {
     id.value = route.params.id
        post.value = await apiService.getOnePost(id.value)
        comments.value = await apiService.getComments(id.value)
    })
</script>