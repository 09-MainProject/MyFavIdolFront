// import { http, HttpResponse } from 'msw';
// import { user } from '@mocks/handlers/authHandlers.ts';

// export const profileHandlers = [
//   http.get('/profile', async ({ request }) => {
//     try {
//       const token = request.headers.get('Authorization');

//       if (!token || !token.startsWith('Bearer ')) {
//         return HttpResponse.json(
//           {
//             code: 401,
//             message: '인증 정보가 없습니다.',
//             data: null,
//           },
//           { status: 401 }
//         );
//       }

//       const currentUser = user.find(u => u.email === 'test@gmail.com'); // 테스트용 이메일

//       if (!currentUser) {
//         return HttpResponse.json(
//           {
//             code: 404,
//             message: '사용자 정보를 찾을 수 없습니다.',
//             data: null,
//           },
//           { status: 404 }
//         );
//       }

//       return HttpResponse.json(
//         {
//           code: 200,
//           message: '프로필 조회에 성공했습니다.',
//           data: {
//             id: 1,
//             email: currentUser.email,
//             name: currentUser.name,
//             nickname: currentUser.nickname,
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//             last_login: new Date().toISOString(),
//             is_staff: true,
//             is_superuser: true,
//             is_active: true,
//           },
//         },
//         { status: 200 }
//       );
//     } catch (error) {
//       return HttpResponse.json(
//         {
//           code: 500,
//           message: '서버 연결에 실패했습니다.',
//           data: null,
//         },
//         { status: 500 }
//       );
//     }
//   }),
// ];

// export const profileUpdateHandlers = [
//   http.patch('/profile', async ({ request }) => {
//     try {
//       const token = request.headers.get('Authorization');

//       if (!token || !token.startsWith('Bearer ')) {
//         return HttpResponse.json(
//           {
//             code: 401,
//             message: '인증 정보가 없습니다.',
//             data: null,
//           },
//           { status: 401 }
//         );
//       }

//       return HttpResponse.json(
//         {
//           code: 200,
//           message: '회원정보가 수정되었습니다.',
//           data: {
//             nickname: 'taejin',
//             profile_image: 'https://...',
//             comment_alarm: true,
//             like_alarm: false,
//             schedule_alarm: true,
//           },
//         },
//         { status: 200 }
//       );
//     } catch (error) {
//       return HttpResponse.json(
//         {
//           code: 500,
//           message: '서버 연결에 실패했습니다.',
//           data: null,
//         },
//         { status: 500 }
//       );
//     }
//   }),
// ];

// export const profileDelete = [
//   http.delete('/profile', async ({ request }) => {
//     try {
//       const token = request.headers.get('Authorization');
//       if (!token || !token.startsWith('Bearer ')) {
//         return HttpResponse.json(
//           {
//             code: 401,
//             message: '인증 정보가 없습니다.',
//             data: null,
//           },
//           { status: 401 }
//         );
//       }

//       return HttpResponse.json(
//         {
//           code: 200,
//           message: '회원 탈퇴가 완료되었습니다.',
//         },
//         { status: 200 }
//       );
//     } catch (e) {
//       return HttpResponse.json(
//         {
//           code: 500,
//           message: '서버 연결에 실패했습니다.',
//           data: null,
//         },
//         { status: 500 }
//       );
//     }
//   }),
// ];
