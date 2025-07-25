import * as process from 'node:process';
import { config } from 'dotenv';
import { LOGGED_ITEM } from './common/logger/logger.service';

config();
const isTrue = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true';
const getInt = (value: string, defaultValue: number) =>
  parseInt(value || '') || defaultValue;

export const APP_PORT = parseInt(process.env.PORT || '') || 4000;

export const AUTH = {
  CRYPT_SALT: getInt(process.env.CRYPT_SALT, 10),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret123123',
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME || '1h',
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
};

enum SIZE_POSTFIX {
  b = 1,
  k = 1024,
  m = k * 1024,
  g = m * 1024,
  t = g * 1024,
}

export const LOGGING = {
  CONSOLE_LOG: isTrue(process.env.ENABLE_CONSOLE_LOG) || true,
  LOG_FILE: process.env.LOG_FILE,
  LOG_FOLDER: process.env.LOG_FOLDER || 'logs',
  get LOG_SIZE() {
    const size = process.env.LOG_FILE_SIZE || '500K';
    const lastChar = size[size.length - 1];
    const isLastNan = isNaN(Number(lastChar));
    const postfix = isLastNan ? lastChar : 'b';
    const numSize = Number(
      size.substring(0, size.length - (isLastNan ? 1 : 0)),
    );
    return numSize * SIZE_POSTFIX[postfix.toLowerCase()];
  },
  get LOG_LEVELS(): LOGGED_ITEM {
    const defaultLog =
      LOGGED_ITEM.LOG |
      LOGGED_ITEM.REQUEST |
      LOGGED_ITEM.RESPONSE |
      LOGGED_ITEM.ERROR |
      LOGGED_ITEM.RES_ERROR;
    if (!process.env.LOG_LEVELS && !process.env.LOG_PRESET) return defaultLog;
    if (!process.env.LOG_PRESET) {
      const rawLevels = process.env.LOG_LEVELS;
      const rawLevelsArray = rawLevels.split(',');
      const levelsArray = rawLevelsArray
        .filter((level) =>
          Object.keys(LOGGED_ITEM).includes(level.toUpperCase()),
        )
        .map((level) => LOGGED_ITEM[level.toUpperCase()]);
      return levelsArray.reduce((acc, level) => acc | level);
    }
    const preset = process.env.LOG_PRESET;
    switch (preset.toLowerCase()) {
      case 'verbose':
        return 512 as LOGGED_ITEM; //all items magic number
      case 'error':
        return LOGGED_ITEM.ERROR | LOGGED_ITEM.FATAL;
      case 'messages':
        return (
          LOGGED_ITEM.REQUEST |
          LOGGED_ITEM.RESPONSE |
          LOGGED_ITEM.RES_ERROR |
          LOGGED_ITEM.LOG
        );
      case 'none':
        return 0 as LOGGED_ITEM;
      case 'normal':
      default:
        return defaultLog;
    }
  },
};

export const DB_CONNECTION = {
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: parseInt(process.env.PG_PORT || '') || 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWD,
};
