export type UserComment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  img: string;
  parentId?: string;
};

export const mockComments: UserComment[] = [
  {
    id: 'c1',
    author: '우주최강연습생',
    content: '이 스케줄 너무 기대돼요!',
    createdAt: '2025-04-30 12:10',
    img: '../src/assets/img/ncity.jpeg',
  },
  {
    id: 'c2',
    author: '팬클럽2기',
    content: '서울 공연 가야지!!',
    createdAt: '2025-04-30 12:15',
    img: '../src/assets/img/ncity.jpeg',
  },
];
