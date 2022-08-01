import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

// for app module
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: +MYSQL_PORT,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  // entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],

  // migrations: ['src/migrations/*.ts'],
  // uncomment only when running migrations, otherwise it'll break lol
  synchronize: false,
};

export const dataSource = new DataSource(config); // for migrations

export default config;
