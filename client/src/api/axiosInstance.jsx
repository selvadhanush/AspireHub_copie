import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if using a different port or URL
});

export default instance;
