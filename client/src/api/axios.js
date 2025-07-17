// In your API configuration file (likely src/api.js or similar)
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-management-i6yl.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;