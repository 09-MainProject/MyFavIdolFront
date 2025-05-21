import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';

function CheckPassword() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line no-console

  const handleSubmit = async e => {
    e.preventDefault(); // 새로 고침을 막음
    try {
      await api.post('/users/check/password', { password }); //
      setVerified(true);
      setErrorMessage('');
      navigate('/editprofile');
    } catch (error) {
      setVerified(false);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white px-4 pt-48">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white px-8 py-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800">
          비밀번호를 입력해주세요
        </h2>

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
        />

        {errorMessage && (
          <p className="-mt-3 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={password === ''}
            className={`w-1/2 rounded-full py-2.5 text-sm font-medium text-white transition ${
              password === ''
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            변경하러 가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckPassword;
