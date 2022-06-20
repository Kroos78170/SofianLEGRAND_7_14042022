 <template>
    <div class="card m-2" style="width: 70%" >
        <div class="card-body">
          <h4 class="card-title">{{comment.firstname}} {{comment.lastname}}</h4> 
          <p class="card-text">{{comment.content}}</p>
          <p>Posté le {{comment.date}} à {{comment.time}}</p>
          <button class="btn btn-primary">Modifier</button>
          <button class="btn btn-danger">Supprimer</button>
        </div>
      </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
})
</script>
 
 