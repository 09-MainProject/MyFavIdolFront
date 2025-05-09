import { api } from '@/lib/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@store/authStore.ts';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import KakaoIcon from '@/assets/icons/KakaoIcon';
import NaverIcon from '@/assets/icons/NaverIcon';

function Login() {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/token/login', form, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.code === 200) {
        const { access_token, csrf_token } = response.data.data;
        setLogin(access_token, csrf_token);
        navigate('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그인 실패:', error);
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
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />

          <button
            type="submit"
            className="w-full rounded bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Login
          </button>
        </form>

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
