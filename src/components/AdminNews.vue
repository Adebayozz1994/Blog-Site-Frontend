<template>
    <div class="min-h-screen bg-gray-100 p-6 space-y-10">
      <!-- Form to post or edit news -->
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">
          {{ editingNewsId ? "Edit News" : "Post News" }}
        </h2>
        <form @submit.prevent="postNews" class="space-y-4">
          <input
            type="text"
            v-model="title"
            placeholder="News Title"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            required
          />
          <textarea
            v-model="content"
            placeholder="News Content"
            rows="5"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            required
          ></textarea>
          <input
            type="file"
            @change="onImageChange"
            class="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
          />
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            {{ editingNewsId ? "Update News" : "Post News" }}
          </button>
        </form>
        <p v-if="message" class="mt-4 text-green-600 font-medium">
          {{ message }}
        </p>
      </div>
  
      <!-- Display all news -->
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">All News</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="news in newsList"
            :key="news.id"
            class="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              v-if="news.image_path"
              :src="`http://localhost:8000/storage/${news.image_path}`"
              alt="News Image"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ news.content }}
              </p>
              <p class="text-sm text-gray-500 mb-4">
                <strong>Author:</strong> {{ news.author }}
              </p>
              <div class="flex space-x-4">
                <button
                  @click="editNews(news)"
                  class="bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  @click="deleteNews(news.id)"
                  class="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const title = ref("");
  const content = ref("");
  const message = ref("");
  const newsList = ref([]);
  const editingNewsId = ref(null);
  const imageFile = ref(null);
  
  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/news");
      newsList.value = response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  
  const onImageChange = (event) => {
    imageFile.value = event.target.files[0];
  };
  
  const postNews = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("content", content.value);
      if (imageFile.value) {
        formData.append("image", imageFile.value);
      }
  
      if (editingNewsId.value) {
        // PUT request for updating news
        await axios.post(
          `http://localhost:8000/api/admin/news/${editingNewsId.value}?_method=PUT`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.value = "News updated successfully!";
      } else {
        // POST request for creating new news
        const response = await axios.post(
          "http://localhost:8000/api/admin/news",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.value = response.data.message;
      }
  
      // Reset form and refresh news list
      title.value = "";
      content.value = "";
      imageFile.value = null;
      editingNewsId.value = null;
      fetchNews();
    } catch (error) {
      console.error("Error posting/updating news:", error);
    }
  };
  
  const editNews = (news) => {
    title.value = news.title;
    content.value = news.content;
    editingNewsId.value = news.id;
  };
  
  const deleteNews = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/admin/news/${id}`
      );
      message.value = response.data.message;
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  
  onMounted(fetchNews);
  </script>
  
  <style scoped>
  /* Add line-clamp utility for text truncation */
  @import "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  
  /* .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  } */
  </style>
  