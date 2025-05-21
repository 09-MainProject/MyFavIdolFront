// src/pages/signup/EmailVerificationResult.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function EmailVerificationResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [result, setResult] = useState({
    code: '',
    message: '',
    verified: false,
  });

  useEffect(() => {
    const code = searchParams.get('code') || '';
    const message = searchParams.get('message') || '알 수 없는 오류입니다.';
    const verifiedParam = searchParams.get('verified')?.toLowerCase();
    const verified = verifiedParam === 'true';

    setResult({ code, message, verified });
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 pb-40">
      <div className="w-full max-w-lg rounded-xl bg-white px-10 py-12 text-center shadow-lg drop-shadow">
        <h1
          className={`mb-4 text-center text-2xl font-bold ${result.verified ? 'text-green-600' : 'text-red-600'}`}
        >
          {result.verified
            ? '이메일 인증이 완료되었습니다!! '
            : '😥 이메일 인증 실패 😥'}
        </h1>
        {result.verified && (
          <>
            <p className="text-center text-lg font-medium">
              이제부터 서비스를 이용하실 수 있어요!🥳🎉
            </p>
            <p className="mb-2 h-6">&nbsp;</p>
          </>
        )}
        <button
          type="submit"
          onClick={() => navigate('/login')}
          className="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800"
        >
          로그인 페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationResult;
