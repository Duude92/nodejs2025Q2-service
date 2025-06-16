import { LoginReqTransform } from './login.req';

export const UserCreateReqTransform = {
  ...LoginReqTransform,
  endpoint: 'POST:/user',
};
