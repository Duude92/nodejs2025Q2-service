import { ITransformer } from '../ITransformer';
import { CreateUserDto } from '../../../user/user.entity';

export const LoginReqTransform = {
  endpoint: '/auth/login',
  isRequest: true,
  transform: (data) => {
    const newObject = JSON.parse(JSON.stringify(data)) as CreateUserDto;
    newObject.password = '[CREDENTIAL]';
    return newObject;
  },
} as ITransformer<CreateUserDto>;
