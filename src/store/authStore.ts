import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  nickname: string;
  profileImage: string;
  commentAlarm: boolean;
  likeAlarm: boolean;
  scheduleAlarm: boolean;
};

interface AuthState {
  user: User | null;
  login: boolean;
  accessToken: string | null;
  csrfToken: string | null;
}

interface AuthActions {
  setLogin: (accessToken: string, csrfToken: string) => void;
  setLogout: () => void;
  isAuthenticated: () => boolean;
  setUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: false,
      accessToken: null,
      csrfToken: null,
      setLogin: (accessToken: string, csrfToken: string) => {
        if (!accessToken || !csrfToken) {
          throw new Error('Invalid tokens provided');
        }
        set({ accessToken, csrfToken, login: true });
      },
      setUser: (user: User) =>
        set(state => ({ user: { ...state.user, ...user } })),
      setLogout: () => {
        set({ accessToken: null, csrfToken: null, login: false, user: null });
          localStorage.removeItem('login-token'); // 토큰 강제 삭제 추가해서 로그인 안해도 로그인처럼 보이던 거 해결
      },
      isAuthenticated: () => {
        const { accessToken, csrfToken } = get();
        return Boolean(accessToken && csrfToken);
      },
    }),
    {
      name: 'login-token',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
