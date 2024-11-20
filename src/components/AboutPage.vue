<template>
    <div class="about-page">
      <div class="container">
        <h1 class="title">About Swift-Blog</h1>
        <p class="description">
          Welcome to <strong>Swift-Blog</strong>, your go-to platform for the latest news and insightful articles. Our mission is to create a news software that's not just better, but revolutionary—outshining platforms like Twitter.
        </p>
  
        <div class="owner-section">
          <h2 class="subtitle">Owned by:</h2>
          <p class="owner-name">Adebayo Peter</p>
        </div>
  
        <div class="address-section">
          <h2 class="subtitle">Head Office:</h2>
          <p class="address">R08 Katangua Area, Ogbomosho, Oyo State, Nigeria</p>
        </div>
  
        <div class="mission-section">
          <h2 class="subtitle">Our Mission:</h2>
          <p class="mission">
            At <strong>Swift-Blog</strong>, we aim to redefine how news is consumed and shared. By prioritizing accuracy, user experience, and innovation, we're setting a new standard for news platforms.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Logic for about page can go here (if needed).
  </script>
  
  <style scoped>
  .about-page {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    color: #333;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 2.5rem;
    color: #007bff;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 20px;
    text-align: justify;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #555;
  }
  
  .owner-name,
  .address,
  .mission {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .owner-name {
    font-weight: bold;
  }
  
  .mission {
    font-style: italic;
  }
  </style>
  