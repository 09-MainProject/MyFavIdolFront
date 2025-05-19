import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '@components/common/Input/Input.tsx';
import { useAuthStore } from '@store/authStore.ts';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import KakaoIcon from '@/assets/icons/KakaoIcon';
import NaverIcon from '@/assets/icons/NaverIcon';
import { api } from '@/lib/api';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { setLogin, setUser } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const refreshProfile = async () => {
  const response = await api.get('/users/profile');
  const userData = response.data.data;
  setUser(userData);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('로그인 제대로?', form);
    try {
      const response = await axios.post('/api/users/token/login', form, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.code === 200) {
        const { access_token, csrf_token } = response.data.data;
        setLogin(access_token, csrf_token);
        await refreshProfile();

        navigate('/');
        window.location.reload();
      }
    } catch (error) {
        console.log('에러', error.response?.data || error);
      if (error.response?.status === 401) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="mb-2 text-center text-2xl font-bold">Sign in</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your credentials to sign in
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            variant="outlined"
          />
          <button
            type="submit"
            className="w-full rounded bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}

        <div className="mt-2 text-center">
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          or continue with
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <KakaoIcon />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <NaverIcon />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <GoogleIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
