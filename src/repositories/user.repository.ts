import { createUser, User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from './repository';

const userStorage: Array<User> = [
  createUser({ login: 'admin', password: 'admin' }),
  createUser({ login: 'user', password: 'user' }),
];

@Injectable()
export class UserRepository extends Repository<User> {
  constructor() {
    super(userStorage);
  }
}
