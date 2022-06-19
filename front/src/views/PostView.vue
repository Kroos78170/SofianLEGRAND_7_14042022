<template>
       <h1>Post</h1>
    <section>
        <h4>{{post.firstname}} {{post.lastname}}</h4>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" class="card-img-top" alt="..."/>
        <p>Posté le {{post.date}} à {{post.time}}</p>
         <RouterLink :to="{ name: 'postForm' , params: { 'id' : id }}" class="btn btn-primary">Modifier</RouterLink>
         <button class="btn btn-primary" @click="deletePost">Supprimer</button>
    </section>
    <section class="d-flex flex-wrap form-group" @submit.prevent="createComment">
      <textarea class="form-control" id="content" rows="1" v-model="content" placeholder="Ajouter un commentaire"></textarea>
      <button type="submit" class="btn btn-success" id="btn" :class="disabled">Valider</button>
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
  let id = route.params.id

  async function deletePost(){
    const del = await apiService.deletePost(id)
           router.push({
                    "name": "posts"
                })
                return del
    }    

  async function createComment(){
    const create = await apiService.createComment(id)
           router.push({
                    "name": "post/:id"
                })
                return create
    }    
  onMounted(async () => {
        post.value = await apiService.getOnePost(id)
        comments.value = await apiService.getComments(id)
    })
</script>
<style>
#content {
  width : 86%;
  padding-left : 0px;
  margin-left : 8px;
  margin-top : 30px;
}

#btn {
  width : 12%;
  margin-left : 10px;
  margin-top : 30px;
}
</style>