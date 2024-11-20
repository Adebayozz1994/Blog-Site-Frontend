<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
      <form @submit.prevent="sendPasswordResetLink" class="space-y-4">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Reset Link
        </button>
        <div v-if="message" class="text-sm text-green-600 mt-4">
          {{ message }}
        </div>
        <div v-if="error" class="text-sm text-red-600 mt-4">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { url } from '@/data';

const email = ref('');
const message = ref('');
const error = ref('');

const sendPasswordResetLink = async () => {
  try {
    // Get CSRF cookie first
    await axios.get(`sanctum/csrf-cookie`);

    const response = await axios.post(`${url}forgot-password`, { email: email.value });
    console.log(response.data); // Log the response
    if (response.data.message) {
      message.value = response.data.message; // Success message
      error.value = '';
    } else if (response.data.error) {
      error.value = response.data.error; // Error message
      message.value = '';
    }
  } catch (err) {
    console.error(err.response?.data || err); // Log the error response
    error.value = err.response?.data?.error || 'An error occurred';
    message.value = '';
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
