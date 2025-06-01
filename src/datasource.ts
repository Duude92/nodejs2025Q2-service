import { DataSource } from 'typeorm';
import { DB_CONNECTION } from './appconfig';

export default new DataSource({
  type: 'postgres',
  ...DB_CONNECTION,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + 'migrations/*.ts'],
});
