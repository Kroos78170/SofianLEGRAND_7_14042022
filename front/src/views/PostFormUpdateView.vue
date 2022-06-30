<template>
<form  @submit.prevent="updatePost" class="form group">
    <div class="form-group">
      <label for="title">Titre</label>
      <input type="text" class="form-control" id="title" v-model="title">
    </div>
    <div class="form-group">
      <label for="content">Contenu</label>
      <textarea class="form-control" id="content" rows="3" v-model="content"></textarea>
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <div>
        <input type="file" class="form-control-file" id="image" @change="previewFiles">
        <img v-if="imagePreview" :src="imagePreview" class="card-img-top" alt="..."/>
      </div>
    </div>
    <div class="mb-3">
        <button type="submit" class="btn btn-success" :class="disabled">Valider</button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useApiService } from '../composable/apiService'

const apiService = useApiService()

 const router = useRouter()
 const route = useRoute();

  const title = ref('')
  const content = ref('')
  const image = ref(null)
  const imagePreview = ref(null)
 
 let postId = route.params.id

 const disabled = computed(() => ({
        disabled: title.value == '' || content.value ==''
    }))

const previewFiles = (event) =>{
  image.value = event.target.files[0]
  imagePreview.value = URL.createObjectURL(event.target.files[0])
}
async function updatePost(){
    const update = await apiService.updatePost(title, content, image, postId)
           router.push({
                    "name": "posts"
                })
                return update
    }    
onMounted(async () => {
        const post = await apiService.getOnePost(postId)
        title.value = post.title
        content.value = post.content
        image.value = post.image
        imagePreview.value = post.image
    })
</script>