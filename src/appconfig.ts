import * as process from 'node:process';
import { config } from 'dotenv';

config();

export const APP_PORT = parseInt(process.env.PORT) || 3000;
export const CRYPT_SALT = process.env.CRYPT_SALT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;
export const PG_USER = process.env.PG_USER;
export const PG_PASSWD = process.env.PG_PASSWD;
