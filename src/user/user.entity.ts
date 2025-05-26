import { randomUUID } from 'node:crypto';
import { IsUUID } from 'class-validator';

export class User {
  constructor(info: CreateUserDto) {
    this.login = info.login;
    this.password = info.password;
    this.id = randomUUID();
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  @IsUUID('4', { each: false })
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export const createUser = (info: CreateUserDto) => new User(info);
