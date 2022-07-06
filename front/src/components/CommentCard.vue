 <template>
    <div class="card m-2" style="width: 70%" >
        <div class="card-body">
          <h4 class="card-title">{{comment.firstname}} {{comment.lastname}}</h4> 
          <p class="card-text">{{comment.content}}</p>
          <p>Posté le {{comment.date}} à {{comment.time}}</p>
          <RouterLink v-if="userStore.isAuthor(comment.idAuthor)" :to="{ name: 'commentFormUpdate' , params: {'commentId' : comment.id, postId : comment.postId}}" class="btn btn-primary">Modifier</RouterLink>
          <button v-if="userStore.isAuthor(comment.idAuthor)"  class="btn btn-danger" @click="deleteComment(comment.id)">Supprimer</button>
        </div>
      </div>
</template>
<script setup>

import { defineProps } from 'vue';
import { useApiService } from '../composable/apiService'
import { useUserStore } from '../stores/user';

const apiService = useApiService()
 const userStore = useUserStore()
 const emit = defineEmits(['deleteComment'])

async function deleteComment(commentId){
    await apiService.deleteComment(commentId)
    emit('deleteComment')
    }   

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
})


</script>
 
 