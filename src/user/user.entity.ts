import { randomUUID } from 'node:crypto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(info: CreateUserDto) {
    this.login = info.login;
    this.password = info.password;
    this.id = randomUUID();
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
    this.version = 1;
  }

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

export const createUser = (info: CreateUserDto) => new User(info);
