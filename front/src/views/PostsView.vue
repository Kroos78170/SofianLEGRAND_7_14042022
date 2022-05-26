<template>
    <h1>Posts</h1>
    <div class="text-center" v-if="isLoading">
    <div class="spinner-border text-secondary " role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <section class="d-flex container  flex-wrap">
      <router-link to={name:}></router-link>
        <PostCard v-for="post in posts" :key="post.id" :post="post"/>
        
        <p v-if="posts.length == 0">Pas de post pour le moment</p>
    </section>
</template>

<script setup>

    import {ref, onMounted} from 'vue'
    import PostCard from '../components/PostCard.vue';

    import { useApiService } from '../composable/apiService'

    const apiService = useApiService()

    let isLoading = ref(true)

    const posts = ref([])

    onMounted(async () => {
        posts.value = await apiService.getPosts()
        isLoading.value = false
    
    })


</script>