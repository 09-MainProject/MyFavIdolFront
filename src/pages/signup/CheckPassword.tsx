import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';

function CheckPassword() {
  const [password, setPassword] = useState('');
  const [, setErrorMessage] = useState('');
  const [, setVerified] = useState(false);
  const navigate = useNavigate();

  // 예시: 실제로는 서버에 요청해서 비교해야 함!
  const handleSubmit = async e => {
    e.preventDefault(); // 새로 고침을 막음 다시 한 번 기억
    try {
      await api.post('/users/check/password', { password }); //
      setVerified(true);
      setErrorMessage('');
      navigate('/profile');
    } catch (error) {
      // 백엔드 서버의 주소로 하면 오류가 날 수 있어서 컴포넌트 내 프로필로 이동
      setVerified(false);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-20">
      <div className="mb-6 w-full max-w-sm self-start text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>{'>'}</span>
          <Link to="/profile" className="hover:text-black">
            프로필
          </Link>
          <span>{'>'}</span>
          <span className="font-semibold text-black">비밀번호 인증</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <h2 className="text-center text-lg font-bold">
          비밀번호를 입력해주세요.
        </h2>

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
        {/* 비밀번호 일치 여부 비밀번호 입력이 없으면 버튼은 활성화되지 않는다 */}
        <button
          type="submit"
          disabled={password === ''}
          className={`w-full rounded-md py-2 text-sm font-semibold transition ${
            password === ''
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          변경하러 가기
        </button>
      </form>
    </div>
  );
}

export default CheckPassword;

// 나중에 서버와 연결되면, 이 페이지에서 비밀번호 대조 후 /profile/edit로 navigate()하기
