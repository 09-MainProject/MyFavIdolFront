import { http, HttpResponse } from 'msw';
import { mockComments } from '@/mocks/comment';

export const handlers = [
  http.get('/dummy', () => HttpResponse.json(mockComments)),
];
