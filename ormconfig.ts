import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// para app module
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Ivan123.',
  database: 'library',
  // entities: [],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  // migrations: ['src/migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(config); // para migrations

export default config;
