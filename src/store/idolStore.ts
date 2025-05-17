import { create } from 'zustand/react';

// Idol 삭제 필요 : 다른 페이지에서 사용하고 있는 부분이 있어 코드 삭제 후 수정 부탁드려요
export interface Idol {
  id: number;
  // idolId: number;
  title: string;
  img: string;
  // type: string;
  startDate: string;
  // endDate: string;
  // location: string;
  // description: string;
  name: string;
  // enName: string;
};

interface IdolState {
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;

  followedIdols: Idol[];
  setFollowedIdols: (idols: Idol[]) => void;
}

export const useIdolState = create<IdolState>(set => ({
  selectedIdolId: null,
  setSelectIdol: (id: number) => set({ selectedIdolId: id }),

  followedIdols: [],
  setFollowedIdols: (idols: Idol[]) => set({followedIdols: idols }),
}));
