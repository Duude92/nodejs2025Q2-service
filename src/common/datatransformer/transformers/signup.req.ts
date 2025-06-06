import { LoginReqTransform } from './login.req';

export const SignupResTransform = {
  ...LoginReqTransform,
  endpoint: '/auth/signup',
};
