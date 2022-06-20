<template>
       <h1>Post</h1>
    <section>
        <h4>{{post.firstname}} {{post.lastname}}</h4>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" class="card-img-top" alt="..."/>
        <p>Posté le {{post.date}} à {{post.time}}</p>
         <RouterLink :to="{ name: 'postFormUpdate' , params: { 'id' : id }}" class="btn btn-primary">Modifier</RouterLink>
         <button class="btn btn-danger" @click="deletePost">Supprimer</button>
    </section>
    <section>
    <form class="d-flex flex-wrap" id="form" @submit.prevent="createComment(id)">
      <textarea class="form-control" id="content" rows="1" v-model="content" placeholder="Ajouter un commentaire"></textarea>
      <button type="submit" class="btn btn-success" id="btn" :class="disabled">Valider</button>
    </form>
      <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" style = "width:100%"/>
    </section>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useApiService } from '../composable/apiService'
  import CommentCard from '../components/CommentCard.vue';

  const apiService = useApiService()

  const post = ref([]);
  const comments = ref([]);
  const route = useRoute();
  const router = useRouter();
  const content = ref('')
  const disabled = computed(() => ({
        disabled: content.value ==''
    }))
 const id = route.params.id

  async function deletePost(){
    const del = await apiService.deletePost(id)
           router.push({
                    "name": "posts"
                })
                return del
    }    

  async function createComment(id){
    const comment = await apiService.createComment(content,id)
         comments.value = await apiService.getComments(id)
         return comment
    }    
  onMounted(async () => {
        post.value = await apiService.getOnePost(id)
        comments.value = await apiService.getComments(id)
    })
</script>
<style>
#content {
  width : 86%;
  margin-left : 8px;
  margin-top : 30px;
}

#btn {
  width : 12%;
  margin-left : 15px;
  margin-top : 30px;
}
</style>