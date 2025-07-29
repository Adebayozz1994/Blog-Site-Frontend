<template>
  <nav class="bg-gray-700 text-white shadow-md">
    <ul class="container mx-auto flex justify-center items-center space-x-8 py-3">
      <li>
        <router-link 
          to="/news" 
          class="text-lg font-semibold tracking-wide transition-colors duration-300 hover:text-indigo-400"
          active-class="text-indigo-400 border-b-2 border-indigo-400"
        >
          Local News
        </router-link>
      </li>
      <li>
        <router-link 
          to="/external" 
          class="text-lg font-semibold tracking-wide transition-colors duration-300 hover:text-indigo-400"
          active-class="text-indigo-400 border-b-2 border-indigo-400"
        >
          World News
        </router-link>
      </li>
      <li>
        <router-link 
          to="/about" 
          class="text-lg font-semibold tracking-wide transition-colors duration-300 hover:text-indigo-400"
          active-class="text-indigo-400 border-b-2 border-indigo-400"
        >
          About
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
