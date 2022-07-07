<template>
    <div class="card m-2" >
            <div  class="card-body">
                <h5 class="card-title">{{post.title}}</h5>
                <img v-if="post.image" :src="post.image" class="card-img-top" alt="...">
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
.card{
    width:30%;
}
@media (max-width: 542px){
    .card{
            width: 100%;
        }
    }
</style>