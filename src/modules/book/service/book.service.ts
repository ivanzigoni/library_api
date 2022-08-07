import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/modules/genre/interfaces/genre.entity';
import { BookGenre } from 'src/modules/join_tables/BookGenre.entity';
import { Repository } from 'typeorm';
import { Author } from '../../author/interfaces/author.entity';
import { CreateBookDto } from '../interfaces/book.dto';
import { Book } from '../interfaces/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  public async findAll(relations: string[]) {
    return this.bookRepository.find({ relations });
  }

  public async findOne(id: number, relations: string[]) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations,
    });

    if (!book) throw new NotFoundException('Book not found');
    else return book;
  }

  public async create(book: CreateBookDto) {
    const newBook = this.bookRepository.create(book);

    const ORquery = book.genres_ids.map((genreId) => ({ id: genreId }));

    const [genres, author] = await Promise.all([
      this.genreRepository.find({ where: ORquery }),
      this.authorRepository.findOne({
        where: { id: book.author_id },
      }),
    ]);

    // considering all genres already exist, relations on book_genres are saved automatically
    newBook.genres = genres;
    newBook.author = author;

    return this.bookRepository.save(newBook);
  }
}
