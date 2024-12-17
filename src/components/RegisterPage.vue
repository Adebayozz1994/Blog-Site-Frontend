<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <!-- Loader -->
    <div v-if="isLoading" class="loader"></div>

    <!-- Registration Form -->
    <div v-else class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
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

const isLoading = ref(true); // State for the initial loader
const loading = ref(false); // State for the button during submission
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

// Function to get the CSRF token
const getCsrfToken = async () => {
  try {
    await axios.get(`${url}sanctum/csrf-cookie`);
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
  }
};

// Show loader initially
onMounted(() => {
  getCsrfToken();
  setTimeout(() => {
    isLoading.value = false; // Hide loader and show form
  }, 2000); // Adjust delay as needed
});

const registerUser = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    const response = await axios.post(`${url}register`, form.value, {
      withCredentials: true,
    });
    console.log(response.data);
    
    successMessage.value = 'Registration successful! Redirecting...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Error: ' + (error.response?.data?.message || 'Something went wrong');
  } finally {
    loading.value = false;
  }
};
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
