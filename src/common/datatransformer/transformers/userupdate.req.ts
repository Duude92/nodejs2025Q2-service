import { ITransformer } from '../ITransformer';
import { UpdatePasswordDto } from '../../../user/user.entity';

export const UserUpdateReqTransform = {
  isRequest: true,
  endpoint: 'PUT:/user',
  transform: (data) => {
    const newObject = JSON.parse(JSON.stringify(data)) as UpdatePasswordDto;
    newObject.oldPassword = '[CREDENTIAL]';
    newObject.newPassword = '[CREDENTIAL]';
    return newObject;
  },
} as ITransformer<UpdatePasswordDto>;
