import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  ValidationError,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/modules/author/interfaces/author.entity';
import { Genre } from 'src/modules/genre/interfaces/genre.entity';
import { Repository } from 'typeorm';
import { UpdateBookDto } from '../interfaces/book.dto';
import { Book } from '../interfaces/book.entity';
import { BOOK_RELATIONS } from '../interfaces/book.entity';

@Injectable()
export class BookExistanceValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }

  async transform(id: string): Promise<Book> {
    this.validateId(id);

    const book = await this.bookRepository.findOne({
      where: { id: +id },
      relations: BOOK_RELATIONS,
    });

    if (!book) throw new NotFoundException(`Book with id ${id} doesn't exist`);

    return Promise.resolve(book);
  }

  private validateId(id: string) {
    if (isNaN(Number(id))) throw new ForbiddenException('Id must be a number');
  }
}

@Injectable()
export class UpdateBookDtoValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }

  async transform(updateDto: UpdateBookDto): Promise<UpdateBookDto> {
    if (updateDto.genres_ids) {
      await this.validateGenres(updateDto.genres_ids);
    } else if (updateDto.author_id) {
      await this.validateAuthor(updateDto.author_id);
    }

    return Promise.resolve(updateDto);
  }

  private async validateGenres(genres: number[]) {
    const ORQuery = genres.map((genreId) => ({ id: genreId }));

    const result = await this.genreRepository.find({ where: ORQuery });

    if (result.length !== genres.length)
      throw new NotFoundException(
        "At least one of the genres couldn't be found",
      );
    else return result;
  }

  private async validateAuthor(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) throw new NotFoundException('Author not found');
  }
}
