<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <!-- Loader -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-indigo-500"></div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>

      <div v-if="user" class="space-y-6">
        <div class="text-center">
          <p class="text-lg font-medium text-gray-700">Name: {{ user.name }}</p>
          <p class="text-gray-500">Email: {{ user.email }}</p>

          <div v-if="user.profile_picture_url" class="mt-4">
            <img
              :src="user.profile_picture_url"
              alt="Profile Picture"
              class="w-36 h-36 rounded-full mx-auto border-2 border-indigo-500"
            />
          </div>
        </div>

        <div class="text-center">
          <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>

        <!-- Profile Picture Upload Section -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Upload Profile Picture</h2>
          <form @submit.prevent="uploadProfilePicture" class="space-y-4">
            <input
              type="file"
              @change="handleFileChange"
              accept="image/*"
              class="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              :disabled="!profilePicture"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg disabled:bg-gray-400"
            >
              Upload Picture
            </button>
          </form>
          <div v-if="uploadMessage" class="text-green-500 mt-2">{{ uploadMessage }}</div>
          <div v-if="uploadError" class="text-red-500 mt-2">{{ uploadError }}</div>
        </div>
        <!-- End of Profile Picture Upload -->

        <!-- Password Update Form -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Update Password</h2>
          <form @submit.prevent="updatePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                v-model="current_password"
                required
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                v-model="password"
                required
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                v-model="password_confirmation"
                required
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Update Password
            </button>
          </form>
          <div v-if="message" class="text-green-500 mt-2">{{ message }}</div>
          <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
        </div>
        <!-- End of Password Update Form -->
      </div>

      <div v-else class="text-center">
        <p class="text-gray-500">Loading user information...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { url } from '../data';
import { useRouter } from 'vue-router';

const user = ref(null);
const loading = ref(true); // Add loading state
const router = useRouter();

const profilePicture = ref(null);
const uploadMessage = ref('');
const uploadError = ref('');

const current_password = ref('');
const password = ref('');
const password_confirmation = ref('');
const message = ref('');
const error = ref('');

const fetchUserInfo = async () => {
  try {
    const response = await axios.get(`${url}user`);
    user.value = response.data.user;

    if (user.value.profile_picture) {
      user.value.profile_picture_url = `http://localhost:8000/storage/profile_picture/${user.value.profile_picture}`;
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
  } finally {
    loading.value = false; // Hide loader when data is fetched
  }
};

const logout = async () => {
  try {
    await axios.post(`${url}logout`);
    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const updatePassword = async () => {
  try {
    const response = await axios.put(
      `${url}password`,
      {
        current_password: current_password.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      message.value = 'Password updated successfully!';
      error.value = '';
    } else {
      error.value = 'Unexpected response from server.';
    }
  } catch (errorResponse) {
    if (errorResponse.response && errorResponse.response.data.errors) {
      error.value = Object.values(errorResponse.response.data.errors).flat()[0];
    } else {
      error.value = 'An error occurred during the update.';
    }
    message.value = '';
  }
};

const handleFileChange = (event) => {
  profilePicture.value = event.target.files[0];
};

const uploadProfilePicture = async () => {
  if (!profilePicture.value) {
    uploadError.value = 'No file selected!';
    return;
  }

  const formData = new FormData();
  formData.append('profile_picture', profilePicture.value);

  try {
    const response = await axios.post(`${url}uploadProfilePic`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    if (response.status === 200) {
      uploadMessage.value = 'Profile picture uploaded successfully!';
      uploadError.value = '';
      fetchUserInfo();
    } else {
      uploadError.value = 'Error uploading profile picture!';
    }
  } catch (error) {
    uploadError.value = 'An error occurred while uploading the picture.';
    uploadMessage.value = '';
  }
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style>
.spinner-border {
  border: 4px solid transparent;
  border-top: 4px solid currentColor;
  border-right: 4px solid currentColor;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
