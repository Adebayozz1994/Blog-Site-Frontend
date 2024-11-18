<template>
    <div>
        <!-- Form to post new news -->
        <h2>Post News</h2>
        <form @submit.prevent="postNews">
            <input type="text" v-model="title" placeholder="News Title" required />
            <textarea v-model="content" placeholder="News Content" required></textarea>
            <button type="submit">Post</button>
        </form>
        <p v-if="message">{{ message }}</p>

        <!-- Display all news with edit and delete options -->
        <h2>All News</h2>
        <div v-for="news in newsList" :key="news.id" class="news-item">
            <h3>{{ news.title }}</h3>
            <p>{{ news.content }}</p>
            <p><strong>Author:</strong> {{ news.author }}</p>
            <button @click="editNews(news)">Edit</button>
            <button @click="deleteNews(news.id)">Delete</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive references
const title = ref('');
const content = ref('');
const message = ref('');
const newsList = ref([]);
const editingNewsId = ref(null);

// Fetch all news on page load
const fetchNews = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/news');
        newsList.value = response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

// Post new news
const postNews = async () => {
    try {
        let response;
        if (editingNewsId.value) {
            // If editing an existing news post, make a PUT request
            response = await axios.put(`http://localhost:8000/api/admin/news/${editingNewsId.value}`, {
                title: title.value,
                content: content.value,
            });
            message.value = 'News updated successfully!';
        } else {
            // If posting new news, make a POST request
            response = await axios.post('http://localhost:8000/api/admin/news', {
                title: title.value,
                content: content.value,
            });
            message.value = response.data.message;
        }

        // Clear form fields and refresh the news list
        title.value = '';
        content.value = '';
        editingNewsId.value = null;  // Reset the editing state
        fetchNews();
    } catch (error) {
        console.error('Error posting/updating news:', error);
    }
};

// Edit news (populate the form with the selected news' data)
const editNews = (news) => {
    title.value = news.title;
    content.value = news.content;
    editingNewsId.value = news.id;  // Save the id of the news being edited
};

// Delete news
const deleteNews = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/admin/news/${id}`);
        message.value = response.data.message;
        fetchNews(); // Refresh the news list after deleting
    } catch (error) {
        console.error('Error deleting news:', error);
    }
};

// Fetch news when component is mounted
onMounted(fetchNews);
</script>
