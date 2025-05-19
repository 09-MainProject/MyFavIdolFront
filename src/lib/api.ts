import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: 'https://wistar.n-e.kr/api',
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const { accessToken, csrfToken } = useAuthStore.getState();

    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (csrfToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  error => Promise.reject(error)
);
