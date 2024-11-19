<template>
    <div>
        <!-- Form to post or edit news -->
        <h2>Post News</h2>
        <form @submit.prevent="postNews">
            <input type="text" v-model="title" placeholder="News Title" required />
            <textarea v-model="content" placeholder="News Content" required></textarea>
            <input type="file" @change="onImageChange" />
            <button type="submit">{{ editingNewsId ? "Update" : "Post" }}</button>
        </form>
        <p v-if="message">{{ message }}</p>

        <!-- Display all news -->
        <h2>All News</h2>
        <div v-for="news in newsList" :key="news.id" class="news-item">
            <h3>{{ news.title }}</h3>
            <img v-if="news.image_path" :src="`http://localhost:8000/storage/${news.image_path}`" alt="News Image" />
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

const title = ref('');
const content = ref('');
const message = ref('');
const newsList = ref([]);
const editingNewsId = ref(null);
const imageFile = ref(null);

const fetchNews = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/news');
        newsList.value = response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

const onImageChange = (event) => {
    imageFile.value = event.target.files[0];
};

const postNews = async () => {
    try {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('content', content.value);
        if (imageFile.value) {
            formData.append('image', imageFile.value);
        }

        let response;
        if (editingNewsId.value) {
            // PUT request for updating news
            response = await axios.post(`http://localhost:8000/api/admin/news/${editingNewsId.value}?_method=PUT`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.value = 'News updated successfully!';
        } else {
            // POST request for creating new news
            response = await axios.post('http://localhost:8000/api/admin/news', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.value = response.data.message;
        }

        // Reset form and refresh news list
        title.value = '';
        content.value = '';
        imageFile.value = null;
        editingNewsId.value = null;
        fetchNews();
    } catch (error) {
        console.error('Error posting/updating news:', error);
    }
};

const editNews = (news) => {
    title.value = news.title;
    content.value = news.content;
    editingNewsId.value = news.id;
};

const deleteNews = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/admin/news/${id}`);
        message.value = response.data.message;
        fetchNews();
    } catch (error) {
        console.error('Error deleting news:', error);
    }
};

onMounted(fetchNews);
</script>
