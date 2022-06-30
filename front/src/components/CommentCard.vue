 <template>
    <div class="card m-2" style="width: 70%" >
        <div class="card-body">
          <h4 class="card-title">{{comment.firstname}} {{comment.lastname}}</h4> 
          <p class="card-text">{{comment.content}}</p>
          <p>Posté le {{comment.date}} à {{comment.time}}</p>
          <RouterLink v-if="userStore.isAuthor(comment.idAuthor)" :to="{ name: 'commentFormUpdate' , params: {'commentId' : comment.id}}" class="btn btn-primary">Modifier</RouterLink>
          <button v-if="userStore.isAuthor(comment.idAuthor)"  class="btn btn-danger" @click="deleteComment(comment.id, postId)">Supprimer</button>
        </div>
      </div>
</template>
<script setup>

import { defineProps } from 'vue';
import { useRouter } from 'vue-router'
import { useApiService } from '../composable/apiService'
import { useUserStore } from '../stores/user';

const apiService = useApiService()

const router = useRouter()
 const userStore = useUserStore()


async function deleteComment(commentId, postId){
   const del = await apiService.deleteComment(commentId)
   //creer un evenement qui dit que tu ecoute déclenchemznr de l'evenement suppression
           router.push({
                    name: 'post', params : {id : postId}
                })
                return del
    }   

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    postId: {
        type: Number,
        required: true
    }
})


</script>
 
 