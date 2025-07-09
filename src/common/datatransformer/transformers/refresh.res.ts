import { LoginResTransform } from './login.res';

export const RefreshResTransform = {
  ...LoginResTransform,
  endpoint: '/auth/refresh',
};
