<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Admin Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter your email" 
            required 
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password" 
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
          Login
        </button>

        <div v-if="error" class="text-sm text-red-600 text-center mt-4">
          {{ error }}
        </div>
      </form>

      <!-- Forgot Password & Register Links -->
      <div class="mt-4 text-center">
        <router-link to="/admin/passwordlink" class="text-blue-600 hover:underline">
          Forgot Password?
        </router-link>
        <span class="mx-2 text-gray-400">|</span>
        <router-link to="/admin/register" class="text-blue-600 hover:underline">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { url } from '@/data';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const login = () => {
  const loginDetails = { email: email.value, password: password.value };
  console.log('Login Details:', loginDetails);

  axios.post(`${url}admin/login`, loginDetails)
    .then(res => {
      const { admin } = res.data;
      if (res.data.status) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('adminDetails', JSON.stringify(admin));

        console.log('Token:', res.data.token);
        console.log('Role:', res.data.role);
        console.log('Admin Details:', admin);

        router.push('/admin/dashboard');
      } else {
        error.value = res.data.error || 'Login failed. Please check your credentials.';
      }
    })
    .catch(err => {
      error.value = 'An error occurred during login. Please try again.';
      console.error('Login error:', err.response?.data || err);
    });
};
</script>
