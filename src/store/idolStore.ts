import { create } from 'zustand/react';

// Idol 삭제 필요 : 다른 페이지에서 사용하고 있는 부분이 있어 코드 삭제 후 수정 부탁드려요
export type Idol = {
  id: number;
  idolId: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  img: string;
  name: string;
  enName: string;
};

// idols 삭제 필요 : 다른 페이지에서 사용하고 있는 부분이 있어 코드 삭제 후 수정 부탁드려요
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
    img: '../src/assets/img/ncity.jpeg',
    name: '트와이스',
    enName: 'twice',
  }
];

interface IdolState {
  idols: Idol[]; // 삭제해야함
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
}

export const useIdolState = create<IdolState>(set => ({
  idols, // 삭제 해야함
  selectedIdolId: null,
  setSelectIdol: (id: number) => set({ selectedIdolId: id }),
}));
