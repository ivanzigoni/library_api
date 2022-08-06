import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  ValidationError,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from '../interfaces/author.entity';

@Injectable()
export class AuthorExistanceValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {
    super();
  }

  async transform(
    id: string,
    // metadata: ArgumentMetadata,
  ): Promise<Author> {
    await this.validate({ id });

    const author = await this.authorRepository.findOne({
      where: { id: +id },
    });

    if (!author)
      throw new NotFoundException(`Author with id ${id} doesn't exist`);

    return Promise.resolve(author);
  }
  protected async validate(
    object: { id: string },
    // validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> {
    const { id } = object;

    if (isNaN(Number(id))) throw new ForbiddenException('Id must be a number');

    return Promise.resolve([] as ValidationError[]);
  }
}
