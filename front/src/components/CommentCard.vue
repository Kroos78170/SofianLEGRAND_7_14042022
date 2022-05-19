 <template>
    <div class="card m-2 " style="width: 70%">
        <div  class="card-body">
            <h5 class="card-title">{{commentlastName}}{{comment.firstName}}</h5>
            <p class="card-text">{{comment.content}}</p>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

</script>
 
 