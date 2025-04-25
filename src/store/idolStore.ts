import { create } from 'zustand/react';

interface IdolState {
  idols: { id: number; name: string }[];
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
  addIdol: (idol: { id: number; name: string }) => void;
  removeIdol: (idolId: number) => void;
}

export const useIdolState = create<IdolState>(set => ({
  idols: [
    { id: 1, name: '트와이스' },
    { id: 2, name: '레드벨벳' },
    { id: 3, name: 'IVE' },
  ],
  selectedIdolId: null,
  setSelectIdol: (id: number) => set({ selectedIdolId: id }),
  addIdol: (idol: { id: number; name: string }) =>
    set(state => ({ idols: [...state.idols, { ...idol }] })),
  removeIdol: (idolId: number) =>
    set(state => ({ idols: state.idols.filter(id => id.id !== idolId) })),
}));
