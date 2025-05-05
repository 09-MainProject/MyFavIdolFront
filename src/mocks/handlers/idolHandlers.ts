import { http, HttpResponse } from 'msw';
import { IdolMock, idolsMock } from '@mocks/data/idolMock.ts';

export const idolHandlers = [
  http.get('/api/idols', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const name = url.searchParams.get('name') ?? '';
      const agency = url.searchParams.get('agency') ?? '';
      const debutDate = url.searchParams.get('debut_date') ?? '';
      const debutDateEnd = url.searchParams.get('debut_date_end') ?? '';
      const ordering = url.searchParams.get('ordering') ?? '';

      // eslint-disable-next-line prefer-const
      let filteredIdols = [...idolsMock];

      if (name) {
        filteredIdols = filteredIdols.filter(v =>
          v.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (agency) {
        filteredIdols = filteredIdols.filter(v =>
          v.agency.toLowerCase().includes(agency.toLowerCase())
        );
      }

      if (debutDate && debutDateEnd) {
        filteredIdols = filteredIdols.filter(
          v => new Date(v.debut_date) >= new Date(debutDateEnd)
        );
      }

      if (ordering) {
        filteredIdols.sort((a, b) => {
          if (ordering.startsWith('-')) {
            const field = ordering.substring(1);
            return b[field]?.localeCompare(a[field]) ?? 0;
          }
          return a[ordering]?.localeCompare(b[ordering]) ?? 0;
        });
      }

      return HttpResponse.json(
        {
          code: 200,
          message: '아이돌 목록',
          data: filteredIdols,
        },
        { status: 200 }
      );
    } catch (e) {
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

export const idolDetailHandlers = [
  http.get('/api/idols/:id', async ({ params }) => {
    try {
      const target = params.id;

      const idols = idolsMock.find(idol => idol.idol_id === Number(target));

      if (!idols) {
        return HttpResponse.json(
          { code: 404, message: '아이돌을 찾을 수 없습니다.', data: null },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        code: 200,
        message: '아이돌 검색 성공',
        data: idols,
      });
    } catch (e) {
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

export const idolUpdateHandlers = [
  http.patch('/api/idols/:id', async ({ request, params }) => {
    try {
      const { id } = params;
      const bodyData = (await request.json()) as IdolMock;
      const idols = idolsMock.find(idol => idol.idol_id === Number(id));

      if (!idols) {
        return HttpResponse.json(
          { code: 404, message: '아이돌을 찾을 수 없습니다.', data: null },
          { status: 404 }
        );
      }
      const newData = { ...idols, ...bodyData };

      return HttpResponse.json(
        {
          code: 200,
          message: '아이돌 변경 성공',
          data: [newData],
        },
        { status: 200 }
      );
    } catch (e) {
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
