<template>
    <div>
      <h2>Forgot Password</h2>
      <form @submit.prevent="sendPasswordResetLink">
        <div>
          <label for="email">Email Address:</label>
          <input type="email" v-model="email" required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
  
      <div v-if="message" class="message">{{ message }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const message = ref('');
  const error = ref('');
  
  const sendPasswordResetLink = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/forgot-password', {
        email: email.value,
      });
  
      message.value = response.data.message;
      error.value = '';
      email.value = ''; // Reset email field
    } catch (errorResponse) {
      if (errorResponse.response && errorResponse.response.data.message) {
        error.value = errorResponse.response.data.message;
      } else {
        error.value = 'An error occurred while requesting the password reset';
      }
      message.value = '';
    }
  };
  </script>
  