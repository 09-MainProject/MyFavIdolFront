import { http, HttpResponse } from 'msw';
import { followedIdolsMock } from '@mocks/data/followedIdolsMock';

export const followHandlers = [
  http.get('/api/idols/follows', async ({ request }) => {
    try {
      const token = request.headers.get('Authorization');

      if (!token || !token.startsWith('Bearer ')) {
        return HttpResponse.json(
          {
            code: 401,
            message: '인증 정보가 없습니다.',
            data: null,
          },
          { status: 401 }
        );
      }

      return HttpResponse.json(
        {
          code: 200,
          message: '아이돌 팔로우 목록 조회',
          data: {
            follows: followedIdolsMock,
          },
        },
        {
          status: 200,
          headers: {
            'Set-Cookie':
              'refresh_token=mock_refresh_token; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict',
          },
        }
      );
    } catch (e) {
      return HttpResponse.json(
        {
          code: 400,
          message: '팔로우 목록 조회에 실패하였습니다.',
          data: null,
        },
        { status: 400 }
      );
    }
  }),
];

export const followCheckHandlers = [
  http.get(
    '/api/idols/:idol_id/follows-status',
    async ({ request, params }) => {
      try {
        const idolId = params.idol_id;
        const token = request.headers.get('Authorization');
        const isFollowing = followedIdolsMock.some(
          idol => idol.idol_id === Number(idolId)
        );

        if (!token || !token.startsWith('Bearer ')) {
          return HttpResponse.json(
            {
              code: 401,
              message: '인증 정보가 없습니다.',
              data: null,
            },
            { status: 401 }
          );
        }

        return HttpResponse.json(
          {
            code: 200,
            message: '팔로우 상태 조회 성공',
            data: {
              idolId: Number(idolId),
              isFollowing,
            },
          },
          {
            status: 200,
            headers: {
              'Set-Cookie':
                'refresh_token=mock_refresh_token; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict',
            },
          }
        );
      } catch (e) {
        return HttpResponse.json(
          {
            code: 400,
            message: '팔로우 목록 조회에 실패하였습니다.',
            data: null,
          },
          { status: 400 }
        );
      }
    }
  ),
];

export const followCreateHandlers = [
  http.post('/api/idols/:idol_id/follows', async ({ request, params }) => {
    try {
      const token = request.headers.get('Authorization');
      const idolId = params.idol_id;
      const fw = followedIdolsMock;
      const fwSome = fw.some(idol => idol.idol_id === Number(idolId));
      const fwFind = fw.find(idol => idol.idol_id === Number(idolId));

      if (!token || !token.startsWith('Bearer ')) {
        return HttpResponse.json(
          {
            code: 400,
            message: '인증 정보가 없습니다.',
            data: null,
          },
          { status: 400 }
        );
      }

      if (fwSome) {
        return HttpResponse.json(
          {
            code: 409,
            message: '이미 존재하는 아이돌입니다.',
            data: null,
          },
          {
            status: 409,
            headers: {
              'Set-Cookie':
                'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            },
          }
        );
      }

      fw.push({
        idol_id: Number(idolId),
        follow_id: fwFind.follow_id,
        idol_name: fwFind.idol_name,
        profile_image: fwFind.profile_image,
      });

      return HttpResponse.json({
        code: 201,
        message: '아이브를 팔로우하였습니다',
        data: {
          idolId: Number(idolId),
        },
      });
    } catch (e) {
      return HttpResponse.json(
        {
          code: 400,
          message: '팔로우 목록 조회에 실패하였습니다.',
          data: null,
        },
        { status: 400 }
      );
    }
  }),
];

export const followDeleteHandlers = [
  http.delete(
    '/api/idols/:idol_id/follows/:follow_id',
    async ({ request, params }) => {
      try {
        const token = request.headers.get('Authorization');
        const idolId = params.idol_id;
        const fw = followedIdolsMock;
        const fwFind = fw.findIndex(v => v.idol_id === Number(idolId));

        if (!token || !token.startsWith('Bearer ')) {
          return HttpResponse.json(
            {
              code: 400,
              message: '인증 정보가 없습니다.',
              data: null,
            },
            { status: 400 }
          );
        }

        if (fwFind === -1) {
          return HttpResponse.json(
            {
              code: 401,
              message: '팔로우 중인 아이돌이 아닙니다.',
              data: null,
            },
            {
              status: 401,
              headers: {
                'Set-Cookie':
                  'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
              },
            }
          );
        }

        fw.splice(fwFind, 1);

        return HttpResponse.json(
          {
            code: 200,
            message: '아이브 팔로우를 취소하였습니다',
            data: {
              idol_id: Number(idolId),
            },
          },
          {
            status: 200,
            headers: {
              'Set-Cookie':
                'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            },
          }
        );
      } catch (e) {
        return HttpResponse.json(
          {
            code: 400,
            message: '팔로우 목록 조회에 실패하였습니다.',
            data: null,
          },
          { status: 400 }
        );
      }
    }
  ),
];
