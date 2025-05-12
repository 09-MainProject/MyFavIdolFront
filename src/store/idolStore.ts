import { create } from 'zustand/react';

interface IdolState {
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
}

export const useIdolState = create<IdolState>(set => ({
  selectedIdolId: null,
  setSelectIdol: (id: number) => set({ selectedIdolId: id }),
}));
