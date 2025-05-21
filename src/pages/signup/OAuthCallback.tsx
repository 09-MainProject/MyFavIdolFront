import { useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');
    const provider = location.pathname.split('/')[2];

    if (!code) return navigate('/login?error=missing_code');

    api
      .post(`/users/${provider}/callback`, state ? { code, state } : { code })
      .then(res => {
        const { access_token, csrf_token } = res.data.data;
        const authStore = useAuthStore.getState();
        authStore.setLogin(access_token, csrf_token);
        navigate('/');
      })
      .catch(err => {
        console.error(`${provider} 로그인 실패`, err);
        navigate('/login?error=oauth');
      });
  }, [params, navigate, location]);

  return <p>로그인 처리 중입니다...</p>;
}

export default OAuthCallback;
