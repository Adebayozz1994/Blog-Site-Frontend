<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Admin Registration</h2>
      <form @submit.prevent="registerAdmin" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            id="name" 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter your name" 
            required 
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            id="email" 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter your email" 
            required 
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
          <input 
            v-model="form.role" 
            type="text" 
            id="role" 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter the role" 
            required 
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            id="password" 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter your password" 
            required 
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Register
        </button>

        <div v-if="status !== null" class="text-center mt-4">
          <p :class="status ? 'text-green-600' : 'text-red-600'">{{ message }}</p>
          <ul v-if="errors.length" class="mt-2 text-red-600 text-sm list-disc list-inside">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { url } from '@/data';

const router = useRouter();
const form = ref({
  name: '',
  email: '',
  role: '',
  password: ''
});

const status = ref(null);
const message = ref('');
const errors = ref([]);

const registerAdmin = async () => {
  try {
    const response = await axios.post(`${url}admin/register`, form.value);
    if (response.data.status) {
      router.push('/admin/login');
      status.value = true;
      message.value = 'Registration successful!';
    } else {
      status.value = false;
      message.value = 'Registration failed';
      errors.value = response.data.errors || [];
    }
  } catch (error) {
    status.value = false;
    message.value = 'Error in registration';
    errors.value = error.response?.data.errors || [];
    console.error('Error in registration:', error.response?.data);
  }
};
</script>
