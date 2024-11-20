<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <div class="text-center mt-4">
          <a
            href="/passwordlink"
            class="text-sm text-indigo-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div v-if="error" class="text-sm text-red-600 mt-4">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { url, getCsrfToken } from '../data';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post(`${url}login`, {
      email: email.value,
      password: password.value,
    });

    console.log('Login response:', response.data);

    if (response.data.status) {
      router.push('/navbar');
    } else {
      error.value = response.data.message || 'Login failed';
    }
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Login failed';
    } else {
      error.value = 'An error occurred during login.';
    }
  }
};

// Fetch CSRF token when the component is mounted
onMounted(getCsrfToken);
</script>
