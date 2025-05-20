import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type User = {
    nickname: string;
    profileImage: string;
    commentAlarm: boolean;
    likeAlarm: boolean;
    scheduleAlarm: boolean;
    is_staff: boolean;
    is_superuser: boolean;
};

interface AuthState {
    user: User | null;
    login: boolean;
    accessToken: string | null;
    csrfToken: string | null;
    isAdmin: boolean | null;
}

interface AuthActions {
    setLogin: (accessToken: string, csrfToken: string) => void;
    setLogout: () => void;
    isAuthenticated: () => boolean;
    setUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore | Partial<AuthStore>>()(
    persist(
        (set) => ({
            user: null,
            login: false,
            accessToken: null,
            csrfToken: null,
            isAdmin: null,
            setLogin: (accessToken: string, csrfToken: string) => {
                if (!accessToken || !csrfToken) {
                    throw new Error('Invalid tokens provided');
                }
                set({accessToken, csrfToken, login: true});
            },
            setUser: (user: User) =>
                set(() => ({
                user,
                isAdmin: !!(user?.is_staff || user?.is_superuser),
                })),
            setLogout: () => {
                set({accessToken: null, csrfToken: null, login: false, user: null, isAdmin: false});
            },
        }),
        {
            name: 'login-token',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
