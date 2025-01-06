<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isSidebarCollapsed }]">
      <h4 class="logo">Admin Dashboard</h4>
      <nav>
        <ul>
          <li @click="showSection('profile')">Profile</li>
          <li @click="showSection('updatePassword')">Update Password</li>
          <li @click="showSection('uploadPicture')">Upload Picture</li>
          <li @click="navigateToNews">Upload News</li>
          <li @click="logout">Logout</li>
          <li @click="register">Register</li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <!-- Navbar -->
      <header class="navbar">
        <button @click="toggleSidebar" class="toggle-sidebar-btn">☰</button>
        <div class="user-info">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-email">{{ user.email }}</p>
          <img
            v-if="user.profile_picture_url"
            :src="user.profile_picture_url"
            alt="Profile Picture"
            class="profile-pic"
          />
        </div>
      </header>

      <!-- Content Sections -->
      <section v-if="activeSection === 'profile'" class="profile-section">
        <h4 class="ml-10">Profile</h4>
        <div class="user-info">
          <p class="ml-10"><strong>Name:</strong> {{ user.name }}</p>
          <p class="ml-10"><strong>Email:</strong> {{ user.email }}</p>
        </div>
      </section>

      <section v-if="activeSection === 'updatePassword'" class="password-section">
        <h4>Update Your Password</h4>
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
      </section>

      <section v-if="activeSection === 'uploadPicture'" class="picture-section">
        <h4>Upload Profile Picture</h4>
        <form @submit.prevent="uploadProfilePicture">
          <div>
            <input type="file" @change="handleFileChange" accept="image/*" />
          </div>
          <button type="submit" :disabled="!profilePicture">Upload Picture</button>
        </form>
        <div v-if="uploadMessage" class="message">{{ uploadMessage }}</div>
        <div v-if="uploadError" class="error">{{ uploadError }}</div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const user = ref({ name: "", email: "", profile_picture_url: "" });
const router = useRouter();
const activeSection = ref("profile");
const isSidebarCollapsed = ref(false); 


const navigateToNews = () => {
  router.push('/admin/news');
};


// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const showSection = (section) => {
  activeSection.value = section;
};

// States for password update form
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const message = ref("");
const error = ref("");

// Profile picture logic
const profilePicture = ref(null);
const uploadMessage = ref("");
const uploadError = ref("");

// Fetch user info
const fetchUserInfo = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios
      .post("http://localhost:8000/api/admin/getAdmin", { token })
      .then((res) => {
        if (res.data.status) {
          user.value.name = res.data.admin.name;
          user.value.email = res.data.admin.email;

          const profilePicUrl = res.data.admin.profile_picture
            ? `http://localhost:8000/storage/profile_picture/${res.data.admin.profile_picture}`
            : null;

          user.value.profile_picture_url = profilePicUrl;
          if (profilePicUrl) {
            localStorage.setItem("profile_picture_url", profilePicUrl);
          }
        }
      })
      .catch(() => router.push("/admin/login"));
  } else {
    router.push("/admin/login");
  }
};

onMounted(() => {
  fetchUserInfo();
  user.value.profile_picture_url = localStorage.getItem("profile_picture_url");
});

// Logout
const logout = () => {
  const token = localStorage.getItem("token");
  axios.post("http://localhost:8000/api/admin/logout", { token }).then(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile_picture_url");
    router.push("/admin/login");
  });
};

// Redirect to register page
const register = () => {
  router.push("/admin/register");
};
</script>

<style scoped>
/* Dashboard Layout */
.dashboard {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 0px;
}

.logo {
  margin-left: 30px;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar nav ul li {
  padding: 5px;
  /* text-align: center; */
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background 0.3s;
}

.sidebar nav ul li:hover {
  background: #34495e;
}

/* Main Content */
.content {
  flex: 1;
  background: #ecf0f1;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3498db;
  color: white;
  padding: 5px 20px;
  border-bottom: 2px solid #2980b9;
}

.toggle-sidebar-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name,
.user-email {
  font-size: 0.9rem;
}

/* Form Styles */
form div {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #2980b9;
}

/* Messages */
.message {
  color: green;
}

.error {
  color: red;
}
</style>
