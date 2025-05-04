import { loginHandlers, refreshHandlers } from '@mocks/handlers/loginHandlers';
import { authHandlers } from '@/mocks/handlers/authHandlers';
import { logoutHandlers } from '@/mocks/handlers/logoutHandlers';

export const handlers = [
  ...authHandlers,
  ...loginHandlers,
  ...refreshHandlers,
  ...logoutHandlers,
];
