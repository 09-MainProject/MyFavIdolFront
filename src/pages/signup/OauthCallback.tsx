import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

interface OAuthResponse {
  access_token: string;
  csrf_token: string;
}

function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogin } = useAuthStore();

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');
    const match = location.pathname.match(/\/users\/([^/]+)\/callback/);
    const provider = match?.[1];

    if (!code || !provider) {
      navigate('/login?error=missing_code_or_provider');
      return;
    }

    api
      .post<OAuthResponse>(`/users/${provider}/callback`, state ? { code, state } : { code })
      .then(res => {
        const { access_token, csrf_token } = res.data;
        setLogin(access_token, csrf_token);
        navigate('/');
      })
      .catch((err: AxiosError) => {
        console.error(`${provider} 로그인 실패`, err.response?.data || err.message);
        navigate('/login?error=oauth');
      });
  }, [params, navigate, location, setLogin]);

  return <p>로그인 처리 중입니다...</p>;
}

export default OAuthCallback;