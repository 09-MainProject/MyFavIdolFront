import { create } from 'zustand/react';

export type Idol = {
  id: number;
  idolId: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

interface IdolState {
  idols: Idol[];
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
  addIdol: (idol: Idol) => void;
  removeIdol: (idolId: number) => void;
}

const idols: Idol[] = [
  {
    id: 1,
    idolId: 1,
    title: '트와이스 팬미팅',
    type: '팬미팅',
    startDate: '2025-05-03',
    endDate: '2025-05-03',
    location: '서울 올림픽홀',
    description: '2025년 상반기 팬미팅',
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
  },
  {
    id: 3,
    idolId: 1,
    title: '음방 출연 - 음악중심',
    type: '방송',
    startDate: '2025-05-18',
    endDate: '2025-05-18',
    location: 'MBC 상암동',
    description: '음악중심 생방송 출연',
  },
];

export const useIdolState = create<IdolState>(set => ({
  idols,
  selectedIdolId: null,
  setSelectIdol: (id: number) => set({ selectedIdolId: id }),
  addIdol: (idol: Idol) =>
    set(state => ({ idols: [...state.idols, { ...idol }] })),
  removeIdol: (idolId: number) =>
    set(state => ({ idols: state.idols.filter(id => id.id !== idolId) })),
}));
