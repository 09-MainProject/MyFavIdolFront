import React, { useState } from 'react';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import KakaoIcon from '@/assets/icons/KakaoIcon';
import NaverIcon from '@/assets/icons/NaverIcon';

function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="mb-2 text-center text-2xl font-bold">Sign Up</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your credentials to sign in
        </p>

        {/* 프로필 아이콘 자리 */}
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Sign up
          </button>
        </form>

        {/* 구분선 텍스트 */}
        <div className="mt-6 text-center text-sm text-gray-400">
          or continue with
        </div>

        {/* 소셜 버튼 */}
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

export default SignUp;
