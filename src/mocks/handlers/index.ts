import { loginHandlers, refreshHandlers } from '@mocks/handlers/loginHandlers';
import {
  profileDelete,
  profileHandlers,
  profileUpdateHandlers,
} from '@mocks/handlers/profileHandlers.ts';
import { authHandlers } from '@/mocks/handlers/authHandlers';
import { logoutHandlers } from '@/mocks/handlers/logoutHandlers';

export const handlers = [
  ...authHandlers,
  ...loginHandlers,
  ...refreshHandlers,
  ...logoutHandlers,
  ...profileHandlers,
  ...profileUpdateHandlers,
  ...profileDelete,
];
