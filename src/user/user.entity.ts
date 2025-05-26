import { randomUUID } from 'node:crypto';

export class User {
  constructor(info: RegistrationInfo) {
    this.login = info.login;
    this.password = info.password;
    this.id = randomUUID();
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface RegistrationInfo {
  login: string;
  password: string;
}

export const createUser = (info: RegistrationInfo) => new User(info);
