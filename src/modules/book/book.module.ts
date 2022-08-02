import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/interfaces/author.entity';
import { Genre } from '../genre/interfaces/genre.entity';
import { BookGenre } from '../join_tables/BookGenre.entity';
import { BookController } from './controller/book.controller';
import { Book } from './interfaces/book.entity';
import { BookService } from './service/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Genre, BookGenre])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
