import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  ValidationError,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
// import { ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../interfaces/book.dto';
import { Book } from '../interfaces/book.entity';
import { Author } from 'src/modules/author/interfaces/author.entity';
import { Genre } from 'src/modules/genre/interfaces/genre.entity';

@Injectable()
export class CreateBookValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }

  async transform(bookDto: CreateBookDto): Promise<CreateBookDto> {
    await Promise.all([
      this.validateAuthor(bookDto),
      this.validateGenres(bookDto),
      this.checkForExistance(bookDto),
    ]);

    return Promise.resolve(bookDto);
  }

  private async validateAuthor(bookDto: CreateBookDto): Promise<void> {
    const result = await this.authorRepository.findOne({
      where: { id: bookDto.author_id },
    });

    if (!result) throw new ForbiddenException('Author not found');
  }

  private async validateGenres(bookDto: CreateBookDto): Promise<void> {
    const queryArray = bookDto.genres_ids.map((genreId) => ({ id: genreId }));

    const result = await this.genreRepository.find({ where: queryArray });

    if (result.length !== bookDto.genres_ids.length)
      throw new NotFoundException('At least one genre was not found');
  }

  private async checkForExistance(bookDto: CreateBookDto): Promise<void> {
    const result = await this.bookRepository.findOne({
      where: { title: bookDto.title, author_id: bookDto.author_id },
    });

    if (result) throw new ForbiddenException('This book is already registred');
  }
}
