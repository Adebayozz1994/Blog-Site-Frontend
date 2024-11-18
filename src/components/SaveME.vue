<template>
    <div>
        <h1>News Feed</h1>
        <div v-for="news in newsFeed" :key="news.id" class="news-post">
            <h2>{{ news.title }}</h2>
            <p>{{ news.content }}</p>
            <p><strong>Author:</strong> {{ news.author }}</p>
            <button @click="toggleLike(news.id)">
                {{ news.user_liked ? 'Unlike' : 'Like' }} ({{ news.likes }})
            </button>

            <!-- Comments Section -->
            <div>
                <h3>Comments</h3>
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

// Reactive references for news feed and comment text
const newsFeed = ref([]);
const commentText = ref('');
const userId = ref(1); // replace with actual user ID, or fetch dynamically if needed

// Save news and comments to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('newsFeed', JSON.stringify(newsFeed.value));
};

// Load news and comments from localStorage
const loadFromLocalStorage = () => {
    const storedNews = localStorage.getItem('newsFeed');
    if (storedNews) {
        newsFeed.value = JSON.parse(storedNews);
    }
};

// Fetch news from API
const fetchNews = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/news');
        console.log(response.data);
        newsFeed.value = response.data.map(news => ({
            ...news,
            user_liked: news.likes.some(like => like.user_id === userId.value)
        }));
        saveToLocalStorage();  // Save the updated newsFeed to localStorage
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

// Toggle like status for a news post
const toggleLike = async (newsId) => {
    try {
        // Send the request to the backend to toggle like
        const response = await axios.post(`http://localhost:8000/api/news/${newsId}/like`);
        
        // Update the news feed with the new like count and user like status
        newsFeed.value = newsFeed.value.map(news => {
            if (news.id === newsId) {
                // Update the liked status and like count
                news.user_liked = response.data.liked;
                news.likes = response.data.likeCount;
            }
            return news;
        });

        saveToLocalStorage();  // Save updated newsFeed to localStorage
    } catch (error) {
        console.error('Error toggling like:', error.response?.data?.message || error.message);
    }
};

// Add comment to a news post
const addComment = async (newsId) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/news/${newsId}/comment`, {
            comment: commentText.value
        });
        commentText.value = ''; // Clear input after commenting

        // Get the new comment from the response
        const newComment = response.data.comment;  // Assuming backend returns the new comment
        const updatedComments = response.data.comments;  // Updated comments list (optional)

        // Directly update the comment section for the specific news post
        newsFeed.value = newsFeed.value.map(news => {
            if (news.id === newsId) {
                news.comments = updatedComments;  // Update the full list of comments (optional)
                news.comments.push(newComment);  // Add the new comment
            }
            return news;
        });

        saveToLocalStorage();  // Save updated newsFeed to localStorage
    } catch (error) {
        console.error('Error adding comment:', error.response?.data?.message || error.message);
    }
};

// Fetch news when component is mounted
onMounted(() => {
    loadFromLocalStorage();  // Try to load from localStorage before making an API call
    if (newsFeed.value.length === 0) {  // If no news is in localStorage, fetch from the API
        fetchNews();
    }
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
