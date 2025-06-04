import * as process from 'node:process';
import { config } from 'dotenv';

config();
const isTrue = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true';
const getInt = (value: string, defaultValue: number) =>
  parseInt(value || '') || defaultValue;

export const APP_PORT = parseInt(process.env.PORT || '') || 4000;

export const AUTH = {
  CRYPT_SALT: getInt(process.env.CRYPT_SALT, 10),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};

export const LOGGING = {
  CONSOLE_LOG: isTrue(process.env.ENABLE_CONSOLE_LOG) || true,
  LOG_FILE: process.env.LOG_FILE,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

export const DB_CONNECTION = {
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: parseInt(process.env.PG_PORT || '') || 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWD,
};
