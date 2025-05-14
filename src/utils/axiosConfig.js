import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-app-backend-0ye4.onrender.com' || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;