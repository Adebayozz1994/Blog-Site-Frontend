<template>
  <div v-if="pageLoading" class="fixed inset-0 flex justify-center items-center bg-gray-100 z-50">
    <!-- Page-Level Loader -->
    <svg
      class="animate-spin h-10 w-10 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
      ></path>
    </svg>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
      <form @submit.prevent="sendPasswordResetLink" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          <span v-if="!loading">Send Reset Link</span>
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
        </button>

        <!-- Success Message -->
        <div v-if="message" class="text-sm text-green-600 mt-4">
          {{ message }}
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-sm text-red-600 mt-4">
          {{ error }}
        </div>

        <!-- Back to Login Link -->
        <div class="text-center mt-4">
          <router-link to="/login" class="text-sm text-indigo-600 hover:underline">
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { url } from '@/data'; 

// Reactive properties
const email = ref('');
const message = ref('');
const error = ref('');
const loading = ref(false);
const pageLoading = ref(true);

// Function to send password reset link
const sendPasswordResetLink = async () => {
  loading.value = true; 
  message.value = '';
  error.value = '';

  try {
    // Fetch CSRF token
    await axios.get(`${url}sanctum/csrf-cookie`);

    // Send the password reset request
    const response = await axios.post(`${url}forgot-password`, { email: email.value });

    // Handle success
    if (response.data.message) {
      message.value = response.data.message;
    } else {
      throw new Error(response.data.error || 'Unexpected response format');
    }
  } catch (err) {
    // Handle errors
    console.error('Error:', err.response?.data || err.message || err);
    error.value = err.response?.data?.message || 'Failed to send reset link. Please try again.';
  } finally {
    loading.value = false; 
  }
};

// Hide page loader after the page is fully loaded
onMounted(() => {
  setTimeout(() => {
    pageLoading.value = false; 
  }, 1000); 
});
</script>

<style scoped>

</style>
