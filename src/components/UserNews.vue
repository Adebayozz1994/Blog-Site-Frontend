<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">News Feed</h1>
    <div v-for="news in newsFeed" :key="news.id" class="news-post border rounded-lg p-2 mb-2 shadow-lg bg-white">
      <!-- Initial View: Topic, Image, Likes, and Comments -->
      <div v-if="!news.showFullDetails" @click="toggleFullDetails(news)" class="cursor-pointer">
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">{{ news.title }}</h2>
        <div v-if="news.image_url" class="mb-4 flex justify-center">
          <img 
            :src="news.image_url" 
            alt="News Image" 
            class="news-image max-w-xs lg:max-w-4xl lg:h-48 rounded-lg object-cover shadow-lg" />
        </div>
        <div class="mt-2 text-gray-600">
          <p><strong>Likes:</strong> {{ news.likeCount }}</p>
          <p><strong>Comments:</strong> {{ news.commentCount }}</p>
        </div>
      </div>

      <!-- Full View: Topic, Content, Image, Likes, and Comments -->
      <div v-else>
        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">{{ news.title }}</h2>
        
        <!-- Content and Image Section -->
        <div class="flex flex-col lg:flex-row items-start gap-6">
          <!-- Content Section -->
          <div class="flex-1">
            <p class="text-gray-600 mb-4 text-lg leading-relaxed">
              {{ news.content }}
            </p>
          </div>

          <!-- Image Section -->
          <div v-if="news.image_url" class="flex justify-center lg:justify-start">
            <img 
              :src="news.image_url" 
              alt="News Image" 
              class="news-image max-w-full lg:max-w-sm h-auto rounded-lg object-cover shadow-lg" />
          </div>
        </div>

        <!-- Action Buttons: Like and Comments -->
        <div class="flex items-center gap-4 mb-4 mt-4 flex-wrap">
          <button
            @click.stop="toggleLike(news.id)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            {{ news.user_liked ? 'Unlike' : 'Like' }} ({{ news.likeCount }})
          </button>
          <button
            @click="toggleComments(news.id)"
            class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded">
            {{ news.showComments ? 'Hide Comments' : 'Show Comments' }}
          </button>
        </div>

        <!-- Comments Section -->
        <div v-if="news.showComments" class="bg-gray-100 p-6">
          <h3 class="text-lg font-medium text-gray-800 mb-4">Comments</h3>
          <div class="max-h-48 overflow-y-auto mb-4 border border-gray-300 rounded-lg p-4 bg-white">
            <div v-for="comment in news.comments" :key="comment.id" class="mb-4">
              <p class="text-gray-800">
                <strong>{{ comment.user_name }}:</strong> {{ comment.comment }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <input
              v-model="commentText"
              placeholder="Add a comment"
              class="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              @click="addComment(news.id)"
              class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
              Comment
            </button>
          </div>
        </div>

        <button 
          @click="toggleFullDetails(news)"
          class="mt-4 text-blue-500 hover:underline">
          Back to Summary
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newsFeed = ref([]);
const commentText = ref('');
const userId = ref(1); // Replace with actual user ID, or fetch dynamically if needed

const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/news');
    newsFeed.value = response.data.map(news => ({
      ...news,
      user_liked: Array.isArray(news.likes) && news.likes.some(like => like.user_id === userId.value),
      showComments: false,
      showFullDetails: false,
      comments: [],
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

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

const toggleComments = (newsId) => {
  const newsItem = newsFeed.value.find(news => news.id === newsId);
  newsItem.showComments = !newsItem.showComments;
  if (newsItem.showComments && !newsItem.comments.length) {
    fetchComments(newsId, newsItem);
  }
};

const fetchComments = async (newsId, newsItem) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/news/${newsId}/comment`);
    newsItem.comments = response.data.map(comment => ({
      ...comment,
      user_name: comment.user_name,
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const addComment = async (newsId) => {
  if (!commentText.value.trim()) return;

  try {
    const response = await axios.post(`http://localhost:8000/api/news/${newsId}/comment`, {
      comment: commentText.value,
    });

    commentText.value = '';
    const newComment = response.data.comment;
    const newsItem = newsFeed.value.find(news => news.id === newsId);
    if (newsItem) {
      newsItem.comments.push(newComment);
      newsItem.commentCount++;
    }
  } catch (error) {
    console.error('Error adding comment:', error.response?.data?.message || error.message);
  }
};

const toggleFullDetails = (news) => {
  news.showFullDetails = !news.showFullDetails;
};

onMounted(() => {
  fetchNews();
});
</script>
