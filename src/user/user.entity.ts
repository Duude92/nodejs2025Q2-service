import { randomUUID } from 'node:crypto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @IsUUID('4', { each: false })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  login: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  version: number; // integer number, increments on update
  @Column({ type: 'bigint' })
  @Transform(({ value }) => Number(value))
  createdAt: number; // timestamp of creation
  @Column({ type: 'bigint' })
  @Transform(({ value }) => Number(value))
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsNotEmpty()
  newPassword: string; // new password
}

const createUserFromDto = (info: CreateUserDto) => {
  const user = new User();
  user.login = info.login;
  user.password = info.password;
  user.id = randomUUID();
  user.createdAt = Date.now();
  user.updatedAt = user.createdAt;
  user.version = 1;
  return user;
};

export const createUser = (info: CreateUserDto) => createUserFromDto(info);
