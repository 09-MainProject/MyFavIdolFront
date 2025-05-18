// import { http, HttpResponse } from 'msw';

// export const logoutHandlers = [
//   http.post('/token/logout', async ({ request }) => {
//     try {
//       const csrfToken = request.headers.get('Authorization');

//       if (csrfToken && csrfToken.startsWith('Bearer ')) {
//         return HttpResponse.json(
//           {
//             code: 200,
//             message: '로그아웃되었습니다.',
//           },
//           {
//             status: 200,
//             headers: {
//               'Set-Cookie':
//                 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
//             },
//           }
//         );
//       }

//       return HttpResponse.json(
//         {
//           code: 401,
//           message:
//             '리프레시 토큰이 없습니다. or 유효하지 않은 리프레시 토큰입니다.',
//         },
//         { status: 401 }
//       );
//     } catch (error) {
//       return HttpResponse.json(
//         {
//           code: 500,
//           message: '서버 오류가 발생했습니다.',
//         },
//         { status: 500 }
//       );
//     }
//   }),
// ];
