import { Config } from 'axios';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// 헤더에 토큰 추가
// api.interceptors.request.use(config => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
