<template>
  <form>
    <div class="form-group">
      <label for="title">Titre</label>
      <input type="text" class="form-control" id="title">
    </div>
    <div class="form-group">
      <label for="content">Contenu</label>
      <textarea class="form-control" id="content" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="image">Ajoutez une image</label>
      <input type="file" class="form-control-file" id="image">
    </div>
  </form>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>