import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects', data);
export const getProject = (id) => API.get(`/projects/${id}`);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const getTasks = (projectId) => API.get(`/tasks/project/${projectId}`);
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const submitTask = (id, data) => API.post(`/tasks/${id}/submit`, data);
export const createEvaluation = (data) => API.post('/evaluations', data);
export const getEvaluations = (projectId) => API.get(`/evaluations/project/${projectId}`);
export const getAnalytics = (projectId) => API.get(`/analytics/project/${projectId}`);
export const getFacultyStats = () => API.get('/projects/stats/faculty');
export const getAdminStats = () => API.get('/admin/stats');
export const getAllUsers = () => API.get('/admin/users');
export const getAllProjects = () => API.get('/admin/projects');
export const updateMarks = (projectId, data) => API.put(`/analytics/project/${projectId}/marks`, data);
