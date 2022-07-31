import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../author/author.entity';
import { CreateBookDto } from './book.dto';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  public async findAll() {
    return this.bookRepository.find({ relations: ['author'] });
  }

  public async create(book: CreateBookDto) {
    const newBook = this.bookRepository.create(book);

    const author = await this.authorRepository.findOne({
      where: { id: newBook.author_id },
    });

    if (!author) {
      throw new ForbiddenException({ message: "Author doesn't exist" });
    }

    return this.bookRepository.save(newBook);
  }
}
