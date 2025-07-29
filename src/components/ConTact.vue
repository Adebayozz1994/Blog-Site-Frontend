<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-800">Get in Touch</h1>
        <p class="text-lg text-gray-600 mt-2">We'd love to hear from you. Please fill out the form below.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-indigo-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p class="text-gray-700">R08 Katangua Area, Ogbomosho, Oyo State, Nigeria</p>
            </div>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-indigo-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <p class="text-gray-700">Ogunladeadebayopeter@gmail.com</p>
            </div>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-indigo-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <p class="text-gray-700">+234 816 622 3968</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <form @submit.prevent="submitForm">
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input v-model="form.name" type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your name" required />
            </div>
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
              <input v-model="form.email" type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" required />
            </div>
            <div class="mb-6">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea v-model="form.message" id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your message" required></textarea>
            </div>
            <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:bg-indigo-700 hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  alert(`Message from ${form.value.name} has been sent.`);
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
};
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
