import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  login: boolean;
  accessToken: string | null;
  csrfToken: string | null;
}

interface AuthActions {
  setLogin: (accessToken: string, csrfToken: string) => void;
  setLogout: () => void;
  isAuthenticated: () => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      login: false,
      accessToken: null,
      csrfToken: null,
      setLogin: (accessToken: string, csrfToken: string) => {
        if (!accessToken || !csrfToken) {
          throw new Error('Invalid tokens provided');
        }
        set({ accessToken, csrfToken, login: true });
      },
      setLogout: () => {
        set({ accessToken: null, csrfToken: null, login: false });
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
