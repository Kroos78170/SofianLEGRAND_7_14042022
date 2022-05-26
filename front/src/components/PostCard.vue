<template>
    <div class="card m-2" style="width:30%"  >
            <div  class="card-body">
                <h5 class="card-title">{{post.title}}</h5>
                <img :src="post.image" class="card-img-top" alt="...">
                <p class="card-text">{{post.content}}</p>
                <RouterLink :to="{ name: 'post', params: { id: post.id} }" class="btn btn-primary">Lire</RouterLink>
            </div>
        </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

</script>
<style scoped>
.card-body img{
    max-width: 200px;
}
</style>