import {create} from 'zustand/react';

// Idol 삭제 필요 : 다른 페이지에서 사용하고 있는 부분이 있어 코드 삭제 후 수정 부탁드려요
export interface Idol {
    id: number;
    name: string;
    en_name: string;
    debut_date: string;
    agency: string;
    description: string;
    profile_image: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    image_url: string;
}

export interface IdolScheduleList {
    data: Idol[];
}

interface IdolState {
    selectedIdolId: number | null;
    setSelectIdol: (idolId: number) => void;
    followedIdols: Idol[];
    setFollowedIdols: (idols: Idol[]) => void;
}

export const useIdolState = create<IdolState>(set => ({
    selectedIdolId: null,
    setSelectIdol: (id: number) => set({selectedIdolId: id}),

    followedIdols: [],
    setFollowedIdols: (idols: Idol[]) => set({followedIdols: idols}),
}));
