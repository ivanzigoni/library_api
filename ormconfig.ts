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

// para app module
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: +MYSQL_PORT,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  // entities: [],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/migrations/*.js'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(config); // para migrations

export default config;
