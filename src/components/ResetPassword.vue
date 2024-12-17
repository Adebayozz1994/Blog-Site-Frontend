<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Reset Your Password</h1>
      <form @submit.prevent="resetPassword" class="space-y-4">
        <input type="hidden" v-model="token" />

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="New Password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            placeholder="Confirm Password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Reset Password
        </button>
      </form>

      <div v-if="message" class="mt-4 text-sm text-green-600">
        {{ message }}
      </div>
      <div v-if="error" class="mt-4 text-sm text-red-600">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
import axios from 'axios';

const route = useRoute();
const router = useRouter(); // Initialize router
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
  try {
    const response = await axios.post('http://localhost:8000/api/reset-password', {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      token: token.value,
    });
    message.value = response.data.status; // Assuming the response returns a status message
    error.value = '';

    // Redirect to login page after a delay to show the success message
    setTimeout(() => {
      router.push('/login'); // Navigate to the login page
    }, 2000); // Adjust delay as needed
  } catch (errorResponse) {
    error.value = errorResponse.response.data.error || 'An error occurred';
    message.value = '';
  }
};
</script>

