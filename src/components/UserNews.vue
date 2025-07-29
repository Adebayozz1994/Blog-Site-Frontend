<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-10">News Feed</h1>
    
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>

    <!-- News Feed -->
    <div v-else>
      <div
        v-for="news in newsFeed"
        :key="news.id"
        class="news-post bg-white rounded-xl p-6 mb-8 shadow-lg transform transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        <!-- Summary View -->
        <div v-if="!news.showFullDetails" @click="toggleFullDetails(news)" class="cursor-pointer">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">
            {{ news.title }}
          </h2>
          <div v-if="news.image_url" class="mb-6 flex justify-center">
            <img
              :src="news.image_url"
              alt="News Image"
              class="w-full max-w-md h-48 object-cover rounded-xl"
            />
          </div>
          <div class="text-center text-gray-600">
            <p class="mb-2"><span class="font-semibold">Likes:</span> {{ news.likeCount }}</p>
            <p><span class="font-semibold">Comments:</span> {{ news.commentCount }}</p>
          </div>
        </div>

        <!-- Full Details View -->
        <div v-else>
          <!-- Title -->
          <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
            {{ news.title }}
          </h2>

          <!-- Content & Image Section -->
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Content -->
            <div class="flex-1">
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ news.content }}
              </p>
            </div>
            <!-- Image -->
            <div v-if="news.image_url" class="flex justify-center lg:justify-start">
              <img
                :src="news.image_url"
                alt="News Image"
                class="w-full max-w-sm h-auto object-cover rounded-xl shadow-md"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 justify-center mt-6">
            <button
              @click.stop="toggleLike(news.id)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              {{ news.user_liked ? "Unlike" : "Like" }} ({{ news.likeCount }})
            </button>
            <button
              @click="toggleComments(news.id)"
              class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              {{ news.showComments ? "Hide Comments" : "Show Comments" }}
            </button>
          </div>

          <!-- Comments Section -->
          <div v-if="news.showComments" class="mt-6 bg-gray-100 rounded-xl p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
            <div class="max-h-64 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4 bg-white">
              <div
                v-for="comment in news.comments"
                :key="comment.id"
                class="mb-4"
              >
                <p class="text-gray-800">
                  <span class="font-semibold">{{ comment.user_name }}:</span> {{ comment.comment }}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <input
                v-model="commentText"
                placeholder="Add a comment"
                class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="addComment(news.id)"
                class="self-end bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Comment
              </button>
            </div>
          </div>

          <!-- Back to Summary Link -->
          <button
            @click="toggleFullDetails(news)"
            class="mt-6 block text-center text-blue-600 hover:underline"
          >
            Back to Summary
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const newsFeed = ref([]);
const commentText = ref("");
const loading = ref(true); // Loading state
const userId = ref(1); // Replace with actual user ID, or fetch dynamically if needed

const fetchNews = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/news");
    newsFeed.value = response.data.map((news) => ({
      ...news,
      user_liked:
        Array.isArray(news.likes) &&
        news.likes.some((like) => like.user_id === userId.value),
      showComments: false,
      showFullDetails: false,
      comments: [],
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    loading.value = false; 
  }
};

const toggleLike = async (newsId) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/news/${newsId}/like`
    );
    newsFeed.value = newsFeed.value.map((news) => {
      if (news.id === newsId) {
        news.user_liked = response.data.liked;
        news.likeCount = response.data.likeCount;
      }
      return news;
    });
  } catch (error) {
    console.error(
      "Error toggling like:",
      error.response?.data?.message || error.message
    );
  }
};

const toggleComments = (newsId) => {
  const newsItem = newsFeed.value.find((news) => news.id === newsId);
  newsItem.showComments = !newsItem.showComments;
  if (newsItem.showComments && !newsItem.comments.length) {
    fetchComments(newsId, newsItem);
  }
};

const fetchComments = async (newsId, newsItem) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/news/${newsId}/comment`
    );
    newsItem.comments = response.data.map((comment) => ({
      ...comment,
      user_name: comment.user_name,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const addComment = async (newsId) => {
  if (!commentText.value.trim()) return;

  try {
    const response = await axios.post(
      `http://localhost:8000/api/news/${newsId}/comment`,
      {
        comment: commentText.value,
      }
    );

    commentText.value = "";
    const newComment = response.data.comment;
    const newsItem = newsFeed.value.find((news) => news.id === newsId);
    if (newsItem) {
      newsItem.comments.push(newComment);
      newsItem.commentCount++;
    }
  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response?.data?.message || error.message
    );
  }
};

const toggleFullDetails = (news) => {
  news.showFullDetails = !news.showFullDetails;
};

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.loader {
  color: #000;
  width: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
  transform: translateX(-38px);
  animation: l21 0.5s infinite alternate linear;
}

@keyframes l21 {
  50% {
    box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;
  }
  100% {
    box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;
  }
}
</style>
