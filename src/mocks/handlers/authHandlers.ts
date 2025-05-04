import { http, HttpResponse } from 'msw';

type Signup = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
};

export const authHandlers = [
  http.post('/signup', async ({ request }) => {
    try {
      const body = await request.json();
      const { email, password, passwordConfirm, name, nickname } =
        body as Signup;

      if (password === passwordConfirm) {
        return HttpResponse.json(
          {
            code: 201,
            message: '회원가입이 완료되었습니다.',
            data: {
              id: 1,
              email,
              name,
              nickname,
              verify_url:
                'http://localhost:8000/api/users/verify/email?code=signed_code',
            },
          },
          { status: 201 }
        );
      }
      return HttpResponse.json(
        {
          code: 400,
          message:
            '비밀번호가 일치하지 않습니다. or 비밀번호가 보안 기준을 만족하지 않습니다.',
          data: 'None or "This password is too short" or "It must contain at least 8 characters." or "This password is too common"',
        },
        { status: 400 }
      );
    } catch (error) {
      return HttpResponse.json(
        {
          code: 500,
          message: '서버가 연결에 실패 했습니다.',
          data: 'no server',
        },
        { status: 500 }
      );
    }
  }),
];
