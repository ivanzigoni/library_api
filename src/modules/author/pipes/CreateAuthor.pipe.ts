import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  ValidationError,
  ForbiddenException,
} from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
// import { ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../interfaces/author.dto';
import { Author } from '../interfaces/author.entity';

@Injectable()
export class CreateAuthorPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {
    super();
  }

  async transform(
    authorDto: CreateAuthorDto,
    // metadata: ArgumentMetadata,
  ): Promise<Author> {
    await this.validate(authorDto);

    const author = this.authorRepository.create(authorDto);

    return Promise.resolve(author);
  }
  protected async validate(
    author: CreateAuthorDto,
    // validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> {
    const result = await this.authorRepository.findOne({
      where: author,
    });

    if (result) throw new ForbiddenException('Author already exists');

    return Promise.resolve([] as ValidationError[]);
  }
}
