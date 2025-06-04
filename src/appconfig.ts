import * as process from 'node:process';
import { config } from 'dotenv';

config();
const isTrue = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true';

export const APP_PORT = parseInt(process.env.PORT || '') || 4000;
export const CRYPT_SALT = process.env.CRYPT_SALT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;

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
