import { ITransformer } from '../ITransformer';

export const RefreshReqTransform = {
  endpoint: '/auth/refresh',
  isRequest: true,
  transform: (data) => {
    const newObject = JSON.parse(JSON.stringify(data)) as IRefreshTokenRequest;
    newObject.refreshToken = '[CREDENTIAL]';
    return newObject;
  },
} as ITransformer<IRefreshTokenRequest>;

interface IRefreshTokenRequest {
  refreshToken: string;
}
