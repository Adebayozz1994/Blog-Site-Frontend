<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <!-- Sticky Navigation Bar -->
    <header class="sticky top-0 z-50 bg-opacity-90 backdrop-blur-md bg-white text-gray-800 shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-2xl font-bold">Swift-Blog</h1>
        <div class="hidden sm:flex items-center space-x-4">
          <nav class="flex space-x-4">
            <a href="#" class="hover:text-indigo-500">Home</a>
            <a href="#" class="hover:text-indigo-500">Categories</a>
            <a href="#" class="hover:text-indigo-500">About</a>
            <a href="#" class="hover:text-indigo-500">Contact</a>
          </nav>
          <input
            type="text"
            placeholder="Search..."
            class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <a href="/login" class="text-indigo-500 font-semibold">Login</a>
        </div>
        <button
          class="sm:hidden text-gray-800 focus:outline-none"
          @click="isNavOpen = !isNavOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div v-if="isNavOpen" class="sm:hidden">
        <nav class="flex flex-col space-y-2 px-6 pb-4">
          <a href="#" class="hover:text-indigo-500">Home</a>
          <a href="#" class="hover:text-indigo-500">Categories</a>
          <a href="#" class="hover:text-indigo-500">About</a>
          <a href="#" class="hover:text-indigo-500">Contact</a>
          <div class="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Search..."
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <a href="/login" class="text-indigo-500 font-semibold text-center py-2 rounded-lg border border-indigo-500 hover:bg-indigo-500 hover:text-white">Login</a>
          </div>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50 animate-pulse"></div>
      <h2 class="text-5xl font-extrabold mb-6 z-10">Welcome to Swift-Blog!</h2>
      <p class="text-lg max-w-2xl mb-8 z-10 text-center px-4 sm:px-0">
        <span class="font-bold text-indigo-300">Stay ahead of the curve!</span> Dive into <span class="text-purple-300">real-time news</span> and <span class="text-pink-300">engaging blogs</span> that matter. <br />
        <span class="font-semibold">Join our vibrant community today and make every moment count!</span>
      </p>
      <a href="/signup" class="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:scale-105 z-10">
        Get Started
      </a>
    </section>

    <!-- News Preview Section -->
    <section class="py-16 bg-gray-100 text-gray-800">
      <div class="container mx-auto">
        <h3 class="text-3xl font-bold text-center mb-12">Flash News</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="news in newsFeed"
            :key="news.id"
            class="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-105"
          >
            <div v-if="news.image_url" class="mb-4">
              <img :src="news.image_url" alt="News Image" class="w-full h-48 object-cover rounded-lg" />
            </div>
            <h4 class="text-xl font-bold mb-2">{{ news.title }}</h4>
            <p class="text-sm text-gray-600 mb-4">{{ news.summary }}</p>
            <a
              href="/login"
              class="text-indigo-500 font-semibold hover:underline"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Subscription Section -->
    <section class="py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
      <div class="container mx-auto text-center">
        <h3 class="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h3>
        <p class="mb-8">Get the latest updates and news delivered to your inbox.</p>
        <form class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input type="email" placeholder="Enter your email" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <button type="submit" class="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:scale-105">
            Subscribe
          </button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-gray-800 text-gray-400">
      <div class="container mx-auto text-center">
        <p>&copy; {{ new Date().getFullYear() }} Swift-Blog. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-4">
          <a href="#" class="hover:text-white">Privacy Policy</a>
          <a href="#" class="hover:text-white">Terms of Service</a>
          <a href="#" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const newsFeed = ref([]);
const isNavOpen = ref(false);

const fetchFlashNews = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/news");
    newsFeed.value = response.data;
  } catch (error) {
    console.error("Error fetching flash news:", error);
  }
};

onMounted(() => {
  fetchFlashNews();
});
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
