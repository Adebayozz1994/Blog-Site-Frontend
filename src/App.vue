<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { url } from '../src/data';

const user = ref({ email: '', profile_picture_url: '' });
const dropdownVisible = ref(false);
const router = useRouter();
const route = useRoute();
const showNavBar = ref(true);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const logout = async () => {
  try {
    await axios.post(`${url}logout`);
    localStorage.removeItem("user"); // Remove user data
    user.value = { email: '', profile_picture_url: '' }; // Reset user state
    router.push('/login'); // Navigate to login
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const fetchUserInfo = async () => {
  try {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    } else {
      // Fetch from API if not found in storage
      const response = await axios.get(`${url}user`);
      console.log(response.data);
      user.value = response.data.user;
      
      // Construct the profile picture URL
      if (user.value.profile_picture) {
        user.value.profile_picture_url = `http://localhost:8000/storage/profile_picture/${user.value.profile_picture}`;
      }

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  } catch (error) {
    console.error("User not authenticated:", error.response?.data?.message);
  }
};

watch(
  () => route.path,
  (newPath) => {
    showNavBar.value = !['/login', '/signup', '/passwordlink', '/reset-password/:token', '/'].includes(newPath) &&
                       !newPath.startsWith('/admin');
  },
  { immediate: true }
);

onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <div>
    <!-- First Navbar -->
    <nav v-if="showNavBar" class="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div class="text-xl font-semibold cursor-pointer" @click="router.push('/')">SWIFT-BLOG</div>
      <div class="flex items-center space-x-4">
        <img 
          :src="user.profile_picture_url || 'http://localhost:8000/storage/profile_picture/default.jpg'" 
          alt="User Image" 
          class="w-10 h-10 rounded-full object-cover" 
        />
        <span class="hidden md:block text-sm">{{ user.email }}</span>
        <div class="relative">
          <button @click="toggleDropdown" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-show="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
            <ul>
              <li><a href="/dashboard" class="block px-4 py-2">Profile</a></li>
              <li><a href="/settings" class="block px-4 py-2">Settings</a></li>
              <li><a href="/contact" class="block px-4 py-2">Contacts</a></li>
              <li><a href="#" class="block px-4 py-2" @click="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Second Navbar with Navigation Links -->
    <nav v-if="showNavBar" class="bg-gray-600 text-white p-2">
      <ul class="flex space-x-4">
        <li><router-link to="/news" class="hover:text-gray-400">Local News</router-link></li>
        <li><router-link to="/external" class="hover:text-gray-400">World News</router-link></li>
        <li><router-link to="/about" class="hover:text-gray-400">About</router-link></li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
