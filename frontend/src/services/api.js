import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? `http://${window.location.hostname}` : `https://${window.location.hostname}`
});

export default api;
