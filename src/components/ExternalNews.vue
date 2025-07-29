<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-indigo-600 text-2xl font-semibold">Loading...</div>
    </div>

    <!-- News Articles -->
    <div v-else class="max-w-5xl mx-auto px-4">
      <div
        v-for="article in sortedExternalNewsArticles"
        :key="article.id"
        class="news-article bg-white rounded-lg shadow-md p-6 mb-8 transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ article.title }}</h2>
        <div v-if="article.url_to_image" class="mb-4">
          <img
            :src="article.url_to_image"
            alt="News Image"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <p class="text-gray-700 mb-2">
          <span class="font-semibold">Description:</span>
          {{ article.description }}
        </p>
        <p class="text-gray-600 mb-4">
          <span class="font-semibold">Content:</span>
          {{ article.content || 'Content not available.' }}
        </p>
        <a
          :href="article.url"
          target="_blank"
          class="inline-block bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Read more
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const externalNewsArticles = ref([]);
    const loading = ref(true);

    // Fetch external news from two endpoints and merge them
    const fetchExternalNews = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://localhost:8000/api/external-news'),
          axios.get('http://localhost:8000/api/fetch-external-news'),
        ]);
        externalNewsArticles.value = [...response1.data, ...response2.data];
      } catch (err) {
        console.error('Error fetching external news:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchExternalNews);

    // Computed property: sort articles by published date (newest first)
    const sortedExternalNewsArticles = computed(() => {
      return externalNewsArticles.value.slice().sort((a, b) => {
        return new Date(b.published_at) - new Date(a.published_at);
      });
    });

    return {
      externalNewsArticles,
      loading,
      sortedExternalNewsArticles,
    };
  },
};
</script>

<style>
.news-article {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.news-article img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 8px 0;
}

.news-article h2 {
  font-size: 1.5rem;
  margin: 8px 0;
}

.news-article p {
  font-size: 1rem;
  color: #555;
}

.news-article a {
  display: inline-block;
  margin-top: 8px;
  color: #007bff;
  text-decoration: none;
}

.news-article a:hover {
  text-decoration: underline;
}

/* Loader styling */
.loader {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 20px;
}
</style>
