<template>
    <div>
      <h1>Reset Your Password</h1>
      <form @submit.prevent="resetPassword">
        <input type="hidden" v-model="token" />
        <input type="email" v-model="email" placeholder="Enter your email" required />
        <input type="password" v-model="password" placeholder="New Password" required />
        <input type="password" v-model="password_confirmation" placeholder="Confirm Password" required />
        <button type="submit">Reset Password</button>
      </form>
      <div v-if="message">{{ message }}</div>
      <div v-if="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const token = ref('');
  const email = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const message = ref('');
  const error = ref('');
  
  onMounted(() => {
    // Get the token from the route parameters
    token.value = route.params.token;
    // Optionally get the email from the query parameters
    email.value = route.query.email || ''; // Default to empty string if not provided
  });
  
  const resetPassword = async () => {
    console.log('Sending data:', {
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    token: token.value
  });
    try {
      const response = await axios.post('http://localhost:8000/api/admin/reset-password', {
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        token: token.value,
        
      });
      
      message.value = response.data.status; // Assuming the response returns a status message
      error.value = '';
    } catch (errorResponse) {
      error.value = errorResponse.response.data.error || 'An error occurred';
      message.value = '';
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  