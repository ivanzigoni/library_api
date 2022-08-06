import { ForbiddenException, Injectable } from '@nestjs/common';
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
    @InjectRepository(BookGenre)
    private bookGenreRepository: Repository<BookGenre>,
  ) {}

  public async findAll() {
    return this.bookRepository.find({ relations: ['author', 'genres'] });
  }

  public async create(book: CreateBookDto) {
    const [author, exists, ...genres] = await Promise.all([
      this.authorRepository.findOne({
        where: { id: book.author_id },
      }),
      this.bookRepository.findOne({
        where: { title: book.title, author_id: book.author_id },
      }),
      ...book.genres_ids.map((genreId) =>
        this.genreRepository.findOne({ where: { id: genreId } }),
      ),
    ]);

    if (!author) {
      throw new ForbiddenException({
        message: "This author hasn't been registred yet",
      });
    } else if (genres.includes(null)) {
      throw new ForbiddenException({
        message: "At least one of the genres hasn't been registred yet",
      });
    } else if (exists) {
      throw new ForbiddenException({
        message: 'Book already registred',
      });
    }

    const newBook = this.bookRepository.create(book);

    const savedBook = await this.bookRepository.save(newBook);

    await Promise.all(
      genres.map((genre) => {
        const relation = this.bookGenreRepository.create({
          book_id: savedBook.id,
          genre_id: genre.id,
        });

        return this.bookGenreRepository.save(relation);
      }),
    );

    return {
      book: savedBook,
      author,
      genres,
    };
  }
}
