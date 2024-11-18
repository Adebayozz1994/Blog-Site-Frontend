<template>
    <div>
      <h1>News Feed</h1>
      <div v-for="news in newsFeed" :key="news.id" class="news-post">
        <h2>{{ news.title }}</h2>
        <p>{{ news.content }}</p>
        <p><strong>Author:</strong> {{ news.author }}</p>
        <p><strong>Likes:</strong> {{ news.likeCount }}</p>
        <p><strong>Comments:</strong> {{ news.commentCount }}</p>
  
        <button @click="toggleLike(news.id)">
          {{ news.user_liked ? 'Unlike' : 'Like' }} ({{ news.likeCount }})
        </button>
  
        <!-- Show comments only when news is clicked -->
        <button @click="toggleComments(news.id)">
          {{ news.showComments ? 'Hide Comments' : 'Show Comments' }}
        </button>
  
        <div v-if="news.showComments">
          <div v-for="comment in news.comments" :key="comment.id" class="comment">
            <p><strong>{{ comment.user_name }}:</strong> {{ comment.comment }}</p>
          </div>
  
          <input v-model="commentText" placeholder="Add a comment" />
          <button @click="addComment(news.id)">Comment</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const newsFeed = ref([]);
  const commentText = ref('');
  const userId = ref(1); // replace with actual user ID, or fetch dynamically if needed
  
  // Fetch news from API
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news');
      newsFeed.value = response.data.map(news => ({
        ...news,
        user_liked: Array.isArray(news.likes) && news.likes.some(like => like.user_id === userId.value),
        showComments: false, // Initially set to false, to hide comments
        comments: [], // Ensure comments are initially empty
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  
  // Toggle like status for a news post
  const toggleLike = async (newsId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/news/${newsId}/like`);
      newsFeed.value = newsFeed.value.map(news => {
        if (news.id === newsId) {
          news.user_liked = response.data.liked;
          news.likeCount = response.data.likeCount;
        }
        return news;
      });
    } catch (error) {
      console.error('Error toggling like:', error.response?.data?.message || error.message);
    }
  };
  
  // Toggle the visibility of comments
  const toggleComments = (newsId) => {
    const newsItem = newsFeed.value.find(news => news.id === newsId);
    newsItem.showComments = !newsItem.showComments;
  
    // If showing comments, fetch the comments from the backend
    if (newsItem.showComments && !newsItem.comments.length) {
      fetchComments(newsId, newsItem);
    }
  };
  
  // Fetch comments for a specific news post
  const fetchComments = async (newsId, newsItem) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/news/${newsId}/comment`);
      newsItem.comments = response.data.map(comment => ({
        ...comment,
        user_name: comment.user_name, // Ensure the user_name is correctly passed
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  // Add comment to a news post
  const addComment = async (newsId) => {
    if (!commentText.value.trim()) return;
  
    try {
      const response = await axios.post(`http://localhost:8000/api/news/${newsId}/comment`, {
        comment: commentText.value,
      });
  
      commentText.value = ''; // Clear input after commenting
  
      const newComment = response.data.comment;
      const newsItem = newsFeed.value.find(news => news.id === newsId);
  
      if (newsItem) {
        newsItem.comments.push(newComment); // Add the new comment to the news item
      }
    } catch (error) {
      console.error('Error adding comment:', error.response?.data?.message || error.message);
    }
  };
  
  // Fetch news when component is mounted
  onMounted(() => {
    fetchNews();
  });
  </script>
  
  <style scoped>
  .news-post {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .comment {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  