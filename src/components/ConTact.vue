<template>
  <div>
    <!-- Loader displayed while content is loading -->
    <div v-if="loading" class="loader">
      Loading...
    </div>

    <!-- Contact Form and Details displayed after data is loaded -->
    <div v-else class="contact-page">
      <h1 class="text-center text-3xl font-bold mb-8">Contact Us</h1>

      <div class="contact-info mb-8">
        <h2 class="text-2xl font-semibold">Our Office</h2>
        <p class="mb-4">R08 Katangua Area Ogbomosho, Oyo state Nigeria.</p>
        <p class="mb-4">Email: Ogunladeadebayopeter@gmail.com</p>
        <p>Phone: +2348166223968</p>
      </div>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="mb-4">
          <label for="name" class="block text-lg">Your Name</label>
          <input v-model="form.name" type="text" id="name" class="form-input" placeholder="Enter your name" required />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-lg">Your Email</label>
          <input v-model="form.email" type="email" id="email" class="form-input" placeholder="Enter your email" required />
        </div>

        <div class="mb-4">
          <label for="message" class="block text-lg">Your Message</label>
          <textarea v-model="form.message" id="message" class="form-input" placeholder="Enter your message" required></textarea>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const loading = ref(true);  // Set initial loading state to true

// Simulate loading delay before displaying the page content
const simulateLoading = () => {
  setTimeout(() => {
    loading.value = false; // Set loading to false after 2 seconds (simulate data fetch)
  }, 2000);
};

onMounted(() => {
  simulateLoading();  // Call simulateLoading when component is mounted
});

// Handle form submission
const submitForm = () => {
  alert(`Message from ${form.value.name} has been sent.`);
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
};
</script>

<style scoped>
/* Loader styling */
.loader {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 50px;
}

/* Contact Page Styles */
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.contact-info {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
  font-size: 1.75rem;
  margin-bottom: 10px;
}

.contact-form .form-input {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.contact-form textarea.form-input {
  height: 150px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  font-size: 1.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
