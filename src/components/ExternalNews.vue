<template>
    <div>
      <div v-for="article in externalNewsArticles" :key="article.id" class="news-article">
        <h2>{{ article.title }}</h2>
        <img :src="article.url_to_image" alt="News Image" />
        <p><strong>Description:</strong> {{ article.description }}</p>
        <p><strong>Content:</strong> {{ article.content || 'Content not available.' }}</p>
        <a :href="article.url" target="_blank">Read more</a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const externalNewsArticles = ref([]);
  
      // Fetch external news from the backend
      const fetchExternalNews = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/external-news');
          externalNewsArticles.value = response.data;
        } catch (err) {
          console.error('Error fetching external news:', err);
        }
        try {
          const response = await axios.get('http://localhost:8000/api/fetch-external-news');
          externalNewsArticles.value = response.data;
        } catch (err) {
          console.error('Error fetching external news:', err);
        }
      };
  
      // Fetch news when the component is mounted
      onMounted(fetchExternalNews);
  
      return {
        externalNewsArticles,
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
  </style>
  