import { create } from 'zustand';
import { Idol } from '@store/idolStore';

interface TimelineStore {
  posts: Idol[];
  removePost: (id: number) => void;
  setPosts: (posts: Idol[]) => void;
  addPost: (post: Idol) => void;
  updatePost: (updatedPost: Idol) => void;
}

export const timelineIdols: Idol[] = [
  {
    id: 1,
    idolId: 1,
    title: '트와이스 팬미팅',
    type: '팬미팅',
    startDate: '2025-05-03',
    endDate: '2025-05-03',
    location: '서울 올림픽홀',
    description: '2025년 상반기 팬미팅',
    img: '../src/assets/img/ncity.jpeg',
    name: '트와이스',
    enName: 'twice',
  },
  {
    id: 2,
    idolId: 1,
    title: '트와이스 콘서트',
    type: '공연',
    startDate: '2025-05-10',
    endDate: '2025-05-10',
    location: '부산 벡스코',
    description: 'TWICE WORLD TOUR 2025',
    img: '../src/assets/img/ncity.jpeg',
    name: '트와이스',
    enName: 'twice',
  },
  {
    id: 3,
    idolId: 1,
    title: '음방 출연 - 음악중심',
    type: '방송',
    startDate: '2025-05-18',
    endDate: '2025-05-18',
    location: 'MBC 상암동',
    description: '음악중심 생방송 출연!',
    img: '../src/assets/img/ncity.jpeg',
    name: '트와이스',
    enName: 'twice',
  },
];

export const useTimelineStore = create<TimelineStore>(set => ({
  posts: timelineIdols,
  setPosts: posts => set({ posts }),
  addPost: (post: Idol) => set(state => ({ posts: [...state.posts, post] })),
  removePost: id =>
    set(state => ({
      posts: state.posts.filter(post => post.id !== id),
    })),
  updatePost: (updatedPost: Idol) =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      ),
    })),
}));
