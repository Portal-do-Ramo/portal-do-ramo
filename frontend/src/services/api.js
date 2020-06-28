import axios from 'axios';

const api = axios.create({
  baseURL: `https://${window.location.hostname}`
});

export default api;
