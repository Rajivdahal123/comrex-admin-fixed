import axios from 'axios';
import Router from 'next/router';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8000/api',
});

apiClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('comrex_token');

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers.AccessToken = accessToken;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, async (error) => {
  const { response } = error;

  if (response.config.headers.Authorization && response.status === 401) {
    localStorage.removeItem('comrex_token');
    await Router.push('/login');
  }

  return Promise.reject(error);
});

export default apiClient;
