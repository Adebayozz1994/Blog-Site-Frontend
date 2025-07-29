<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center py-24 flex items-center justify-center" style="background-image: url('https://source.unsplash.com/random/1600x900/?news,technology')">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="container mx-auto text-center text-white relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold leading-tight mb-4">About Swift-Blog</h1>
        <p class="text-xl text-gray-300">
          Redefining how news is consumed and shared.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container mx-auto py-16 px-6">
      <!-- Mission Section -->
      <section class="mb-16 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At <strong>Swift-Blog</strong>, we are dedicated to creating a revolutionary news platform that outshines the competition. We prioritize accuracy, user experience, and innovation to set a new standard in the industry. Our goal is to provide a seamless and engaging experience for our readers, keeping them informed and connected.
        </p>
      </section>

      <!-- Details Section -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Owner Info -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Owned by</h3>
          <p class="text-lg text-gray-700 font-medium">Adebayo Peter</p>
        </div>

        <!-- Head Office Info -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Head Office</h3>
          <p class="text-lg text-gray-700">
            R08 Katangua Area, Ogbomosho, Oyo State, Nigeria
          </p>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center mt-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Join Us on Our Journey</h2>
        <p class="text-lg text-gray-600 mb-8">
          We are always looking for passionate individuals to join our team and help us grow.
        </p>
        <a href="/contact" class="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:bg-indigo-700 hover:-translate-y-1">
          Contact Us
        </a>
      </section>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this static page.
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>

  