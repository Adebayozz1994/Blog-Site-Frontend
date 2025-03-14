<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Forgot Password</h2>

      <form @submit.prevent="sendPasswordResetLink" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            v-model="email" 
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter your email" 
            required 
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Send Reset Link
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="message" class="mt-4 text-green-600 text-center text-sm">
        {{ message }}
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 text-red-600 text-center text-sm">
        {{ error }}
      </div>

      <!-- Back to Login -->
      <div class="mt-4 text-center">
        <router-link to="/admin/login" class="text-blue-600 hover:underline">
          Back to Login
        </router-link>
      </div>
    </div>
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
    error.value = errorResponse.response?.data?.message || 'An error occurred while requesting the password reset';
    message.value = '';
  }
};
</script>
