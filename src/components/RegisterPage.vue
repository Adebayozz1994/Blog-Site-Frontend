<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center">Register</h1>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
  
        <div v-if="errorMessage" class="text-sm text-red-600 mt-4">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-sm text-green-600 mt-4">
          {{ successMessage }}
        </div>

        <!-- Anchor tag for login -->
        <div class="text-center mt-4">
          <span class="text-sm text-gray-600">
            Already have an account?
          </span>
          <a
            href="/login"
            class="text-sm text-indigo-600 hover:underline ml-1"
          >
            Login here
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { url } from '@/data';

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

// Function to get the CSRF token
const getCsrfToken = async () => {
  try {
    // Make a GET request to set the CSRF cookie
    await axios.get(`${url}sanctum/csrf-cookie`);
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
  }
};

// Call the CSRF token method when the component is mounted
onMounted(() => {
  getCsrfToken();
});

const registerUser = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    // Send the registration request
    const response = await axios.post(`${url}register`, form.value, {
      withCredentials: true, // Ensure cookies are sent for session
    });
    console.log(response.data);
    
    successMessage.value = 'Registration successful! Redirecting...';
    setTimeout(() => {
      router.push('/login'); // Redirect to the dashboard or any other page after registration
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Error: ' + (error.response?.data?.message || 'Something went wrong');
  } finally {
    loading.value = false;
  }
};
</script>
