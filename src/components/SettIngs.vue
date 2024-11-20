<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Settings</h1>
  
        <div v-if="user" class="space-y-6">
          <!-- Edit Profile Section -->
          <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  v-model="user.name"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>
  
          <!-- Update Password Section -->
          <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Update Password</h2>
            <form @submit.prevent="updatePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  v-model="current_password"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  v-model="password"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  v-model="password_confirmation"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Update Password
              </button>
            </form>
            <div v-if="message" class="text-green-500 mt-2">{{ message }}</div>
            <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
          </div>
        </div>
  
        <div v-else class="text-center">
          <p class="text-gray-500">Loading user information...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { url } from '../data';
  
  const user = ref(null);
  const current_password = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const message = ref('');
  const error = ref('');
  
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${url}user`);
      user.value = response.data.user;
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  
  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${url}user/update`,
        {
          name: user.value.name,
          email: user.value.email
        },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        message.value = 'Profile updated successfully!';
        error.value = '';
      } else {
        error.value = 'Unexpected response from server.';
      }
    } catch (errorResponse) {
      if (errorResponse.response && errorResponse.response.data.errors) {
        error.value = Object.values(errorResponse.response.data.errors).flat()[0];
      } else {
        error.value = 'An error occurred during the update.';
      }
      message.value = '';
    }
  };
  
  const updatePassword = async () => {
    try {
      const response = await axios.put(
        `${url}password`,
        {
          current_password: current_password.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        message.value = 'Password updated successfully!';
        error.value = '';
      } else {
        error.value = 'Unexpected response from server.';
      }
    } catch (errorResponse) {
      if (errorResponse.response && errorResponse.response.data.errors) {
        error.value = Object.values(errorResponse.response.data.errors).flat()[0];
      } else {
        error.value = 'An error occurred during the update.';
      }
      message.value = '';
    }
  };
  
  onMounted(() => {
    fetchUserInfo();
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  