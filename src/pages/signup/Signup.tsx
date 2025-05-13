import React, { useEffect, useState } from 'react';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import KakaoIcon from '@/assets/icons/KakaoIcon';
import NaverIcon from '@/assets/icons/NaverIcon';
import { api } from '@/lib/api';

type User = {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  nickname: string;
};

// 글자 수 유효성 검사
const isPasswordLengthValid = (password: string) => password.length >= 8 && password.length <= 25;
// 특수문자 포함 여부
const containsSpecialChar = (password: string) => {
  // eslint-disable-next-line no-useless-escape
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return specialCharRegex.test(password);
};
// 길이랑 특수문자가 포함됐는지 확인 함수 (나중에 싹 다 리팩토링 // 합친다거나 그런 거 여부 확인해보기)
const isValidPassword = (password: string) => isPasswordLengthValid(password) && containsSpecialChar(password);

function SignUp() {
  const [form, setForm] = useState<User>({
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    nickname: '',
  });
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean | null>(
    null
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setIsPasswordMatched(
      form.password === '' || form.password_confirm === ''
        ? null
        : form.password === form.password_confirm
    );
  }, [form.password, form.password_confirm]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidPassword(form.password)) {
      setErrorMessage('비밀번호는 특수문자를 포함한 8자 이상이여야 합니다!');
      return;
    }

    if (form.password !== form.password_confirm) {
      setErrorMessage('입력하신 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await api.post('/users/signup', form);
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const isFormFilled = // 불리언 값을 담는 변수이므로 {} 필요 없음
    form.name !== '' &&
    form.email !== '' &&
    form.password !== '' &&
    form.password_confirm !== '' &&
    form.nickname !== '';

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
            name="name"
            placeholder="Enter your username"
            value={form.name}
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
            type="text"
            name="nickname"
            placeholder="Enter your nickname"
            value={form.nickname}
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
            name="password_confirm"
            placeholder="Confirm your password"
            value={form.password_confirm}
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
