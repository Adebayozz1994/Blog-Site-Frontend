<template>
  <div class="dashboard">
    <h4>Dashboard</h4>

    <!-- Displaying the User's Name and Email -->
    <div class="user-info">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <div v-if="user && user.profile_picture_url">
        <img :src="user.profile_picture_url" alt="Profile Picture" width="150" height="150" />
      </div>
    </div>

    <!-- Update Password Button: Only visible if the form is not shown -->
    <button v-if="!showUpdatePasswordForm" 
            @click="showUpdatePasswordForm = true"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
      Update Password
    </button>

    <!-- Profile Picture Upload Section -->
    <div>
      <h2>Upload Profile Picture</h2>
      <form @submit.prevent="uploadProfilePicture">
        <div>
          <input type="file" @change="handleFileChange" accept="image/*" />
        </div>
        <button type="submit" :disabled="!profilePicture">Upload Picture</button>
      </form>
      <div v-if="uploadMessage" class="message">{{ uploadMessage }}</div>
      <div v-if="uploadError" class="error">{{ uploadError }}</div>
    </div>
    <!-- End of Profile Picture Upload -->

    <!-- Display Update Password Form if the user clicked the button -->
    <div v-if="showUpdatePasswordForm">
      <h2>Update Your Password</h2>
      <form @submit.prevent="updatePasswordByEmail">
        <div>
          <label>Email Address</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" v-model="password_confirmation" required />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>

    <!-- Success Message -->
    <div v-if="message" class="message">{{ message }}</div>

    <!-- Error Message -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Logout Button -->
    <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
      Logout
    </button>
    <button @click="register" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
      Register
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = ref({ name: '', email: '' });
const router = useRouter();

// States for password update form
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const message = ref('');
const error = ref('');
const showUpdatePasswordForm = ref(false); // Toggle for showing the update password form

// Profile picture logic
const profilePicture = ref(null);
const uploadMessage = ref('');
const uploadError = ref('');

// Fetch user info and persist profile picture in localStorage
const fetchUserInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.post('http://localhost:8000/api/admin/getAdmin', { token })
      .then(res => {
        if (res.data.status) {
          user.value.name = res.data.admin.name;
          user.value.email = res.data.admin.email;

          // Set profile picture URL and store it in localStorage
          const profilePicUrl = res.data.admin.profile_picture 
            ? `http://localhost:8000/storage/profile_picture/${res.data.admin.profile_picture}` 
            : null;

          user.value.profile_picture_url = profilePicUrl;
          if (profilePicUrl) {
            localStorage.setItem('profile_picture_url', profilePicUrl); // Persist profile picture URL
          }
        } else {
          console.error('Failed to fetch user info');
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  } else {
    // If there's no token, redirect to login page
    router.push('/admin/login');
  }
};

// Call fetchUserInfo when the component is mounted
onMounted(() => {
  fetchUserInfo();
  
  // Load profile picture URL from localStorage on reload
  user.value.profile_picture_url = localStorage.getItem('profile_picture_url');
});

// Logout function
const logout = () => {
  const token = localStorage['token'];
  axios.post('http://localhost:8000/api/admin/logout', { token }).then(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile_picture_url'); // Remove profile picture URL from storage on logout
    router.push('/admin/login');
  });
};

// Register function
const register = () => {
  router.push('/admin/register');
};

// Update password function
const updatePasswordByEmail = async () => {
  const token = localStorage.getItem('token'); // Ensure the token is available

  if (!token) {
    error.value = "No token found, please log in again.";
    return;
  }

  try {
    // Make sure token is passed in the request
    const response = await axios.put('http://localhost:8000/api/admin/password', {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      token: token, // Include the token for authentication
    });

    // Handle response success
    message.value = response.data.message;
    error.value = '';

    // Clear form fields
    email.value = '';
    password.value = '';
    password_confirmation.value = '';
    showUpdatePasswordForm.value = false; // Hide the form after submission
  } catch (errorResponse) {
    // Handle error responses from the backend
    if (errorResponse.response && errorResponse.response.data.errors) {
      const errors = errorResponse.response.data.errors;
      error.value = errors.email?.[0] || errors.password?.[0] || 'An error occurred';
    } else {
      error.value = 'An error occurred';
    }

    message.value = '';
  }
};

// Profile Picture Upload Handler
const handleFileChange = (event) => {
  profilePicture.value = event.target.files[0]; // Store the selected file
};

const uploadProfilePicture = async () => {
  if (!profilePicture.value) {
    uploadError.value = 'No file selected!';
    return;
  }

  const formData = new FormData();
  formData.append('profile_picture', profilePicture.value);
  try {
    const response = await axios.post('http://localhost:8000/api/admin/uploadProfilePic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      uploadMessage.value = 'Profile picture uploaded successfully!';
      uploadError.value = '';

      // Update profile picture URL in localStorage after upload
      const newProfilePicUrl = response.data.profile_picture_url;
      user.value.profile_picture_url = newProfilePicUrl;
      localStorage.setItem('profile_picture_url', newProfilePicUrl); // Persist new profile picture URL
    } else {
      uploadError.value = 'Error uploading profile picture!';
    }
  } catch (error) {
    uploadError.value = 'An error occurred while uploading the picture.';
    uploadMessage.value = '';
    console.error('Upload Error:', error);
  }
};
</script>

<style scoped>
/* Add styling as needed */
.message {
  color: green;
}
.error {
  color: red;
}
</style>
