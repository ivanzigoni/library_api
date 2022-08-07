import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import config from 'ormconfig';

export default [
  TypeOrmModule.forRoot(config),
  AuthorModule,
  UserModule,
  BookModule,
  GenreModule,
];
