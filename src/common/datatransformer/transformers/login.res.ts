import { ITransformer } from '../ITransformer';

export const LoginResTransform = {
  endpoint: '/auth/login',
  isRequest: false,
  transform: (data) => {
    const newObject = JSON.parse(JSON.stringify(data)) as ITokenPair;
    newObject.accessToken = '[CREDENTIAL]';
    newObject.refreshToken = '[CREDENTIAL]';
    return newObject;
  },
} as ITransformer<ITokenPair>;

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
