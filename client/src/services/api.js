import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api';
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
};

// Create Axios instance
const API = axios.create({
  baseURL: getBaseURL(),
});

// Request interceptor to automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('noman_portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('noman_portfolio_token');
        localStorage.removeItem('noman_portfolio_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const loginAdmin = (credentials) => API.post('/auth/login', credentials);
export const getMe = () => API.get('/auth/me');
export const updatePassword = (passwords) => API.put('/auth/password', passwords);

// Hero Endpoints
export const getHero = () => API.get('/hero');
export const updateHero = (formData) =>
  API.put('/hero', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Project Endpoints
export const getProjects = () => API.get('/projects');
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const createProject = (formData) =>
  API.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateProject = (id, formData) =>
  API.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Settings Endpoints
export const getSettings = () => API.get('/settings');
export const updateSettings = (data) => API.put('/settings', data);

// Messages / Contact Inbox Endpoints
export const submitMessage = (data) => API.post('/messages', data);
export const getMessages = () => API.get('/messages');
export const toggleMessageRead = (id, read) => API.put(`/messages/${id}/read`, { read });
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

// Testimonials Endpoints
export const getTestimonials = () => API.get('/testimonials');
export const submitPublicTestimonial = (formData) =>
  API.post('/testimonials/public', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const createTestimonial = (formData) =>
  API.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateTestimonial = (id, formData) =>
  API.put(`/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteTestimonial = (id) => API.delete(`/testimonials/${id}`);

// Timeline Endpoints
export const getTimeline = () => API.get('/timeline');
export const createTimeline = (data) => API.post('/timeline', data);
export const updateTimeline = (id, data) => API.put(`/timeline/${id}`, data);
export const deleteTimeline = (id) => API.delete(`/timeline/${id}`);

// Certificates Endpoints
export const getCertificates = () => API.get('/certificates');
export const createCertificate = (formData) =>
  API.post('/certificates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateCertificate = (id, formData) =>
  API.put(`/certificates/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteCertificate = (id) => API.delete(`/certificates/${id}`);

export default API;
