import { defineStore } from 'pinia';
import axios from 'axios';
import { url } from '@/data';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userProfilePicture: (state) => {
      if (state.user && state.user.profile_picture) {
        return `http://localhost:8000/storage/profile_picture/${state.user.profile_picture}`;
      }
      return 'http://localhost:8000/storage/profile_picture/default.jpg';
    },
    userEmail: (state) => (state.user ? state.user.email : ''),
  },
  actions: {
    async fetchUser() {
      if (this.user) return;
      try {
        const response = await axios.get(`${url}user`);
        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('User not authenticated:', error.response?.data?.message);
        this.user = null;
        localStorage.removeItem('user');
      }
    },
    async logout() {
      try {
        await axios.post(`${url}logout`);
        this.user = null;
        localStorage.removeItem('user');
        router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
});
