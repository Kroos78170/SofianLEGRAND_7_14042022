<template>
<form  @submit.prevent="createPost" class="form group">
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useApiService } from '../composable/apiService'

const apiService = useApiService()

 const router = useRouter()

  const title = ref('')
  const content = ref('')
  const image = ref(null)
  const imagePreview = ref(null)
 

 const disabled = computed(() => ({
        disabled: title.value == '' || content.value ==''
    }))

const previewFiles = (event) =>{
  console.log(event.target.files[0])
  image.value = event.target.files[0]
  imagePreview.value = URL.createObjectURL(event.target.files[0])
}
async function createPost(){
    const create = await apiService.createPost(title, content, image)
           router.push({
                    "name": "posts"
                })
                return create
    }    
</script>