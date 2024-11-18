<template>
    <div class="admin-login-form">
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
  
        <button type="submit">Login</button>
  
        <div v-if="error">
          <p class="error">{{ error }}</p>
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
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const login = () => {
    const loginDetails = { email: email.value, password: password.value };
    console.log('Login Details:', loginDetails);
  
    axios.post(`${url}admin/login`, loginDetails)
      .then(res => {
        const {admin } = res.data;
        if (res.data.status) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('adminDetails', JSON.stringify(admin));
  
          console.log('Token:', res.data.token);
          console.log('Role:', res.data.role);
          console.log('Admin Details:', admin);
          
  
          router.push('/admin/dashboard');
        } else {
          error.value = res.data.error || 'Login failed. Please check your credentials.';
        }
      })
      .catch(err => {
        error.value = 'An error occurred during login. Please try again.';
        console.error('Login error:', err.response?.data || err);
      });
  };
  </script>
  
  <style>
  .admin-login-form {
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
  .error {
    color: red;
  }
  </style>
  