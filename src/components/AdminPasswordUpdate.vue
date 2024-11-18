<template>
    <div>
      <h2>Update Your Password</h2>
      <form @submit.prevent="updatePasswordByEmail">
        <div>
          <label>Email Address</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" v-model="password_confirmation" required />
        </div>
        <button type="submit">Update Password</button>
      </form>
  
      <!-- Success Message -->
      <div v-if="message" class="message">{{ message }}</div>
  
      <!-- Error Message -->
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  // Form and message states
  const email = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const message = ref('');
  const error = ref('');
  
  // Add token from localStorage or get it from an authenticated session
//   const token = ref(localStorage.getItem('admin_token')); // or other method to retrieve token

  const token = ref(localStorage.getItem('token')); // Ensure the token is available

if (!token.value) {
  error.value = "No token found, please log in again.";
  
}
console.log(token.value);
  
  const updatePasswordByEmail = async () => {
    try {
      // Make sure token is passed in the request
      const response = await axios.put('http://localhost:8000/api/admin/password', {
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        token: token.value, // Include the token for authentication
      });
  
      // Handle response success
      message.value = response.data.message;
      error.value = '';
  
      // Clear form fields
      email.value = '';
      password.value = '';
      password_confirmation.value = '';
    } catch (errorResponse) {
      // Handle error responses from the backend
      if (errorResponse.response && errorResponse.response.data.errors) {
        const errors = errorResponse.response.data.errors;
        error.value = errors.email?.[0] || errors.password?.[0] || 'An error occurred';
      } else {
        error.value = 'An error occurred';
      }
  
      message.value = '';
    }
  };
  </script>
  
  <style scoped>
  /* Add styling as needed */
  .message {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  