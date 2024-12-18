import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000/';

// API base URL
const url = 'http://localhost:8000/api/';

// Fetch CSRF token
const getCsrfToken = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set successfully');
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
  }
};

export { url, getCsrfToken };
