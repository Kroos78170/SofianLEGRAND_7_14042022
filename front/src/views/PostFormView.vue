<template>
<PostForm :mode="create"/>
</template>

<script setup>
 import { useRoute } from 'vue-router';
 import PostForm from '../components/PostForm.vue'
</script>