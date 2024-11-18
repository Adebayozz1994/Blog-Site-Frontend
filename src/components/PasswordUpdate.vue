<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold mb-6 text-center">Update Your Password</h2>
      <form @submit.prevent="updatePassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            v-model="current_password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Password
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
import { ref } from 'vue';
import axios from 'axios';

const current_password = ref('');
const password = ref('');
const password_confirmation = ref('');
const message = ref('');
const error = ref('');

const updatePassword = async () => {
  try {
    const response = await axios.put('http://localhost:8000/api/password', {
      current_password: current_password.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    console.log(response.data);

    message.value = 'Password updated successfully!';
    error.value = '';
    // Clear form fields
    current_password.value = '';
    password.value = '';
    password_confirmation.value = '';
  } catch (errorResponse) {
    error.value = errorResponse.response.data.errors?.updatePassword[0] || 'An error occurred';
    message.value = '';
  }
};
</script>
