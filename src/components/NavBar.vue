<template>
    <user-news v-if="user" />
  </template>
  
  <script setup>
  import UserNews from './UserNews.vue';
  import { ref } from 'vue';
  const user = ref({ email: '', profile_picture_url: '' });
  </script>
  