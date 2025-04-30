import React, { useState, useEffect } from 'react';
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

  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean | null>(
    null
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setIsPasswordMatched(
      form.password === '' || form.confirmPassword === ''
        ? null
        : form.password === form.confirmPassword
    );
  }, [form.password, form.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // email 한글 및 @ 포함 체크
    if (name === 'email') {
      const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (koreanRegex.test(value)) {
        setEmailError('이메일에는 한글을 입력할 수 없습니다.');
      } else if (!value.includes('@')) {
        setEmailError('올바른 이메일을 입력해주세요.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrorMessage('입력하신 비밀번호가 일치하지 않습니다.');
    }
  };

  const isFormFilled = // 불리언 값을 담는 변수이므로 {} 필요 없음
    form.username !== '' &&
    form.email !== '' &&
    form.password !== '' &&
    form.confirmPassword !== '';

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="mb-2 text-center text-2xl font-bold">Sign Up</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your credentials to sign in
        </p>

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
          {emailError && (
            <div className="text-sm text-red-500">{emailError}</div>
          )}
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
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}
          {isPasswordMatched !== null && (
            <div
              className={`text-sm ${isPasswordMatched ? 'text-green-500' : 'text-red-500'}`}
            >
              {isPasswordMatched
                ? '비밀번호가 일치합니다'
                : '비밀번호가 일치하지 않습니다'}
            </div>
          )}
          <button
            type="submit"
            disabled={!isFormFilled || !isPasswordMatched}
            className={`w-full rounded-md py-2 text-sm font-semibold transition ${
              isFormFilled && isPasswordMatched
                ? 'bg-black text-white hover:bg-gray-800'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            Sign up
          </button>
        </form>

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

export default SignUp;
