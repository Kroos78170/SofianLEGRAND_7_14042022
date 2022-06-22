<template>
 <form class="d-flex flex-wrap" id="form" @submit.prevent="updateComment(id)">
      <textarea class="form-control" id="content" rows="1" v-model="content"></textarea>
      <button type="submit" class="btn btn-success" id="btn" :class="disabled">Valider</button>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApiService } from '../composable/apiService'

const apiService = useApiService();

const route = useRoute()
const router = useRouter()


const content = ref('');
const id = route.params.id

const disabled = computed(() => ({
        disabled: content.value ==''
    }))

async function updateComment(){
    const update = await apiService.updateComment(id)
           router.push({
                    "name": "posts"
                })
                return update
    }    




</script>