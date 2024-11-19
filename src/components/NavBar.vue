<template>
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white p-4 flex items-center justify-between">
      <!-- Logo or other navbar items can go here -->
      <div class="text-xl font-semibold">Your App</div>
  
      <!-- User Info (Image and Email) -->
      <div class="flex items-center space-x-4">
        <!-- User Image -->
        <img src="http://localhost:8000/storage/profile_picture/user.jpg" alt="User Image" class="w-10 h-10 rounded-full object-cover">
  
        <!-- User Email -->
        <span class="hidden md:block text-sm">user@example.com</span>
  
        <!-- Dropdown for user options -->
        <div class="relative">
          <button @click="toggleDropdown" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
  
          <!-- Dropdown Menu -->
          <div v-show="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
            <ul>
              <li><a href="#" class="block px-4 py-2">Profile</a></li>
              <li><a href="#" class="block px-4 py-2">Settings</a></li>
              <li><a href="#" class="block px-4 py-2">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const dropdownVisible = ref(false);
  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };
  document.addEventListener('click', (event) => {
    const dropdownMenu = document.querySelector('.absolute');
    const dropdownButton = document.querySelector('button');
    if (dropdownMenu && dropdownButton && !dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
      dropdownVisible.value = false;
    }
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here if necessary */
  </style>
  