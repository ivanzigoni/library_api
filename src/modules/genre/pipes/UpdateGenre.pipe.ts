import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGenreDto } from '../interfaces/genre.dto';
import { Genre } from '../interfaces/genre.entity';

@Injectable()
export class GenreExistanceValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }
  async transform(id: string): Promise<Genre> {
    this.validateId(id);

    const genre = await this.genreRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!genre) throw new NotFoundException("This genre doesn't exist");

    return Promise.resolve(genre);
  }

  private validateId(id: string) {
    if (isNaN(Number(id))) throw new ForbiddenException('Id must be a number');
  }
}

@Injectable()
export class UpdateGenreValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }
  async transform(payload: UpdateGenreDto): Promise<UpdateGenreDto> {
    const genre = await this.genreRepository.findOne({
      where: {
        name: payload.name,
      },
    });

    if (genre)
      throw new ForbiddenException("There's already a genre with that name");

    return Promise.resolve(payload);
  }
}
