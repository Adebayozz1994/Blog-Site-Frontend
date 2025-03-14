<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white">
    <header class="absolute top-0 w-full flex justify-between items-center p-6 bg-transparent">
      <h1 class="text-3xl font-bold tracking-wide">Swift-Blog</h1>
    </header>

    <main class="flex-1 flex flex-col justify-center items-center">
      <div class="text-center mb-10">
        <h2 class="text-4xl font-extrabold mb-4">
          Welcome to Swift-Blog!
        </h2>
        <p class="text-lg max-w-2xl">
          Swift-Blog is your go-to platform for staying updated with real-time
          news and insightful blogs. Join us to be part of an engaging community.
        </p>
      </div>
      <div class="mt-10 space-y-6">
        <a
          href="/login"
          class="block text-center py-3 px-6 bg-white text-indigo-500 font-semibold rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:scale-105"
        >
          Login
        </a>
        <a
          href="/signup"
          class="block text-center py-3 px-6 bg-indigo-700 font-semibold rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:scale-105"
        >
          Sign Up
        </a>
      </div>
    </main>

    <footer class="absolute bottom-0 w-full py-4 text-center text-sm bg-transparent">
      &copy; {{ new Date().getFullYear() }} Swift-Blog. All rights reserved.
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>

header {
  animation: fadeIn 1s ease-out;
}

a {
  animation: bounceIn 0.8s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
