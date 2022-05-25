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
      <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </section>
  </main>
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

  onMounted(async () => {
    const id = route.params.id
        post.value = await apiService.getOnePost(id)
        comments.value = await apiService.getComments(id)
    })
</script>