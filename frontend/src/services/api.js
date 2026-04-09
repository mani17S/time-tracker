import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'  // ← Remove '/api' from here
});

// Auto-add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);  // ← Changed
export const login = (data) => API.post('/auth/login', data);        // ← Changed

// Timer APIs
export const getTimers = () => API.get('/timers');                   // ← Changed
export const createTimer = (name) => API.post('/timers', { name });  // ← Changed
export const startTimer = (id) => API.post(`/timers/${id}/start`);   // ← Changed
export const pauseTimer = (id) => API.post(`/timers/${id}/pause`);   // ← Changed
export const deleteTimer = (id) => API.delete(`/timers/${id}`);      // ← Changed
export const getTotalTime = (id) => API.get(`/timers/${id}/total`);  // ← Changed
export const resetTimer = (id) => API.post(`/timers/${id}/reset`);
export default API;