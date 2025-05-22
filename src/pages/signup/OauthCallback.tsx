import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// interface OAuthResponse {
//   code:number,
//   data:{
//     access_token: string;
//     csrf_token: string;
//   },
//   message:string;
// }

function OauthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogin } = useAuthStore();

  useEffect(() => {
  const loginWithProvider = async () => {
    console.log('로그인 함수 실행');
    const code = params.get('code');
    const state = params.get('state');
    const match = location.pathname.match(/\/users\/([^/]+)\/callback/);
    const provider = match?.[1];

    // if (!code || !provider) {
    //   navigate('/login?error=missing_code_or_provider');
    //   return;
    // }
    try {
      const res = await axios.post(
        `https://wistar.n-e.kr/api/users/${provider}/callback`,
        state ? { code, state } : { code },
        {
          headers: {
            Authorization: '', // 불필요한 토큰 제거
          },
        }
      );
      console.log('🟢 로그인 성공', res.data);
       const { access_token, csrf_token } = res.data.data;
      setLogin(access_token, csrf_token);
         navigate('/');
    } catch (err) {
      console.error('❌ 런타임 에러 발생', err);
       console.error(`${provider} 로그인 실패`, err.response?.data || err.message);
      navigate('/login?error=oauth');
    }
   

  };

  loginWithProvider();
}, [params, navigate, location, setLogin]);
return <div>로그인 처리 중</div>;

}

export default OauthCallback;