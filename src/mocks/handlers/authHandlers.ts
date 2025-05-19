import { http, HttpResponse } from 'msw';

type Signup = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
};

// 테스트용 계정 미리 추가
export const user: Signup[] = [
  {
    email: 'test@gmail.com',
    password: '1234',
    passwordConfirm: '1234',
    name: '테스트',
    nickname: '테스트닉네임',
  },
];

export const authHandlers = [
  http.post('/signup', async ({ request }) => {
    try {
      const body = await request.json();
      const { email, password, passwordConfirm, name, nickname } =
        body as Signup;

      // 이미 존재하는 이메일인지 확인
      if (user.some(u => u.email === email)) {
        return HttpResponse.json(
          {
            code: 400,
            message: '이미 존재하는 이메일입니다.',
            data: null,
          },
          { status: 400 }
        );
      }

      user.push({ email, password, passwordConfirm, name, nickname });

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
