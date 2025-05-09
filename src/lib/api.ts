import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // ✅ 반드시 반환해야 함
  },
  error => Promise.reject(error)
);
