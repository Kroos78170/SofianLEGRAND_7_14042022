<template>
  <main>
       <h1>Post</h1>
    <section>
      {{route.params.id}}
        <h4>{{post.lastName}} {{post.firstName}}</h4>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
    </section>
    <section>
        <h4>{{comment.lastName}} {{comment.firstName}}</h4>
        <p>{{comment.content}}</p>
        <p>{{comment.date}} à {{comment.time}}</p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'; 

const post = ref({id: 1, title: 'titre', content: 'contenudidisj', lastName: 'Foiré',  firstName: 'Roland'})
const comment = ref([
  {
    id: 1,
    content: 'sdfgfdh',
    date: '27/06/1991',
    time: '23h15',
    lastName: 'Foiré',
    firstName: 'Roland'
  },
   {
    id: 2,
    content: 'sdfgfdh',
    date: '27/06/1991',
    time: '23h15',
    lastName: 'Foiré',
    firstName: 'Roland'
  }, {
    id: 3,
    content: 'sdfgfdh',
    date: '27/06/1991',
    time: '23h15',
    lastName: 'Foiré',
    firstName: 'Roland'
  }, {
    id: 4,
    content: 'sdfgfdh',
    date: '27/06/1991',
    time: '23h15',
    lastName: 'Foiré',
    firstName: 'Roland'
  },
])
const route = useRoute();


</script>