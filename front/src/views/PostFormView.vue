<template>
<PostForm :id="id" />
</template>

<script setup>
 import { ref } from 'vue';
 import { useRoute } from 'vue-router';
 import PostForm from '../components/PostForm.vue'

 const route = useRoute()

 let id = ref(route.params.id)
</script>