<template>
  <nav class="sticky top-0 z-50 bg-gray-800 text-white p-4 flex items-center justify-between shadow-md transition-all duration-300">
    <div class="text-xl font-semibold cursor-pointer" @click="goHome">SWIFT-BLOG</div>
    <div class="flex items-center space-x-4">
      <img 
        :src="authStore.userProfilePicture" 
        alt="User Image" 
        class="w-10 h-10 rounded-full object-cover" 
      />
      <span class="hidden md:block text-sm">{{ authStore.userEmail }}</span>
      <div class="relative">
        <button @click="toggleDropdown" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div v-show="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg origin-top-right">
            <ul>
              <li><a href="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Profile</a></li>
              <li><a href="/settings" class="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
              <li><a href="/contact" class="block px-4 py-2 hover:bg-gray-100">Contacts</a></li>
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="handleLogout">Logout</a></li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const dropdownVisible = ref(false);
const router = useRouter();

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const handleLogout = async () => {
  await authStore.logout();
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
