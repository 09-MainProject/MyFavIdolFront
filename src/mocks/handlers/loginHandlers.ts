import { http, HttpResponse } from 'msw';
import { user } from '@mocks/handlers/authHandlers.ts';

type Props = {
  email: string;
  password: string;
};

export const loginHandlers = [
  http.post('/token/login', async ({ request }) => {
    try {
      const body = await request.json();
      const { email, password } = body as Props;

      const login = user.find(
        v => v.email === email && v.password === password
      );

      if (email === 'test@gmail.com' && password === '1234') {
        const response = {
          code: 200,
          message: '로그인을 성공했습니다.',
          data: {
            accessToken: 'mock_access_token',
            csrfToken: 'mock_csrf_token',
          },
        };
        return HttpResponse.json(response, {
          status: 200,
          headers: {
            'Set-Cookie':
              'refresh_token=mock_refresh_token; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict',
          },
        });
      }

      if (login) {
        const response = {
          code: 200,
          message: '로그인을 성공했습니다.',
          data: {
            accessToken: 'mock_access_token',
            csrfToken: 'mock_csrf_token',
          },
        };

        return HttpResponse.json(response, {
          status: 200,
          headers: {
            'Set-Cookie':
              'refresh_token=mock_refresh_token; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict',
          },
        });
      }

      return HttpResponse.json(
        {
          code: 401,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
        { status: 401 }
      );
    } catch (error) {
      return HttpResponse.json(
        {
          code: 500,
          message: '서버 오류가 발생했습니다.',
        },
        { status: 500 }
      );
    }
  }),
];

export const refreshHandlers = [
  http.post('/token/refresh', async ({ request, cookies }) => {
    const csrfToken = request.headers.get('X-CSRFToken');
    const refreshToken = cookies.refresh_token;

    if (csrfToken && refreshToken) {
      return HttpResponse.json(
        {
          code: 200,
          message: '액세스 토큰이 재발급되었습니다.',
          data: {
            accessToken: 'mock_token',
            csrfToken: 'mock_csrf_token',
          },
        },
        { status: 200 }
      );
    }

    if (!refreshToken) {
      return HttpResponse.json(
        {
          code: 401,
          message: '리프레시 토큰이 없습니다.',
          data: null,
        },
        { status: 401 }
      );
    }

    if (!csrfToken) {
      return HttpResponse.json(
        {
          code: 403,
          message: '유효하지 않은 CSRF 토큰입니다.',
          data: null,
        },
        { status: 403 }
      );
    }

    return HttpResponse.json(
      {
        code: 400,
        message: '잘못된 요청',
        data: null,
      },
      { status: 400 }
    );
  }),
];
