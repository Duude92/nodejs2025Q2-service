import { createUser, User } from './user.entity';
import { Injectable } from '@nestjs/common';

const userStorage: Array<User> = [
  createUser({ login: 'admin', password: 'admin' }),
  createUser({ login: 'user', password: 'user' }),
];

interface Query<T> {
  where?: T;
}

const defaultUser = new User({ login: '', password: '' });

@Injectable()
export class UserRepository {
  async findOne(query: Query<unknown>): Promise<User | undefined> {
    if (!query.where) throw new Error("Query rule 'where' should be provided");
    if (!Object.keys(defaultUser).includes(Object.keys(query.where)[0]))
      throw new Error('Query should provide existing object field');
    return userStorage.find(
      (user) =>
        user[Object.keys(query.where)[0]] === Object.values(query.where)[0],
    );
  }

  async find(query?: Query<unknown>): Promise<User[] | undefined> {
    if (!query) return userStorage;
    return userStorage.filter(
      (user) =>
        user[Object.keys(query.where)[0]] === Object.values(query.where)[0],
    );
  }

  async save(user: User): Promise<User> {
    const initialIdx = userStorage.findIndex((user) => user.id === user.id);
    if (initialIdx > -1) userStorage.splice(initialIdx, 1);
    user.updatedAt = Date.now();
    userStorage.push(user);
    return user;
  }
}
