<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <!-- Loader -->
    <div v-if="isLoading" class="loader"></div>

    <!-- Login Form -->
    <div v-else class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
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
          <a href="/passwordlink" class="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div class="text-center mt-4">
          <span class="text-sm text-gray-600">Don't have an account?</span>
          <router-link to="/signup" class="text-sm text-indigo-600 hover:underline">
            Register here
          </router-link>
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
const isLoading = ref(true); 
const router = useRouter();




const checkAuth = async () => {
  try {
    // 🔹 Fetch current user
    const response = await axios.get(`${url}user`, { withCredentials: true });
    
    if (response.data) {
      console.log('User is already authenticated:', response.data);
      router.push('/newspage'); 
    }
  } catch (err) {
    console.log('User is not authenticated');
  } finally {
    isLoading.value = false; 
  }
};

const login = async () => {
  try {
    
    const response = await axios.post(`${url}login`, {
      email: email.value,
      password: password.value,
    });

    console.log('Login response:', response.data);

    if (response.data.status) {
      router.push('/newspage');
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

// Simulate loading delay
onMounted(() => {
  getCsrfToken();
  checkAuth ();
  setTimeout(() => {
    isLoading.value = false; 
  }, 2000); 
});
</script>

<style scoped>
/* Loader Styles */
.loader {
  color: #000;
  width: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
  transform: translateX(-38px);
  animation: l21 0.5s infinite alternate linear;
}

@keyframes l21 {
  50% {
    box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;
  }
  100% {
    box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;
  }
}
</style>
