<template>
    <div class="admin-register-form">
      <h2>Admin Registration</h2>
      <form @submit.prevent="registerAdmin">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="role">Role</label>
          <input v-model="form.role" type="text" id="role" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" required />
        </div>
  
        <button type="submit">Register</button>
  
        <div v-if="status !== null">
          <p :class="status ? 'success' : 'error'">{{ message }}</p>
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
import { url } from '@/data';
  
  const router = useRouter();
  const form = ref({
    name: '',
    email: '',
    role: '',
    password: ''
  });
  
  const status = ref(null);
  const message = ref('');
  const errors = ref([]);
  
  const registerAdmin = async () => {
    try {
      const response = await axios.post(`${url}admin/register`, form.value);
      if (response.data.status) {
        router.push('/admin/login');
        status.value = true;
        message.value = 'Registration successful!';
      } else {
        status.value = false;
        message.value = 'Registration failed';
        errors.value = response.data.errors || [];
      }
    } catch (error) {
      status.value = false;
      message.value = 'Error in registration';
      errors.value = error.response?.data.errors || [];
      console.error('Error in registration:', error.response?.data);
    }
  };
  </script>
  
  <style>
  .admin-register-form {
    max-width: 400px;
    margin: auto;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .form-group {
    margin-bottom: 1em;
  }
  label {
    display: block;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    padding: 0.5em 1em;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  