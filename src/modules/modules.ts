import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CustomerModule } from './customer/customer.module';
import config from 'ormconfig';

export default [
  TypeOrmModule.forRoot(config),
  AuthorModule,
  BookModule,
  CustomerModule,
];
