import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: 'http://43.203.181.6/api',
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
