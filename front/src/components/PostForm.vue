<template>
  <div>
    <b-form-input v-model="title" placeholder="Titre"></b-form-input>
    <div class="mt-2">Value: {{ title }}</div>
  </div>
  <div>
    <b-form-input v-model="content" placeholder="Entrez votre texte ici"></b-form-input>
    <div class="mt-2">Value: {{ content }}</div>
  </div>
  <div>
    <b-form-file v-model="file" class="mt-3" plain></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        content: '',
        file: null
      }
    }
  }
</script>