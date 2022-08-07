import { ForbiddenException, Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from '../interfaces/genre.dto';
import { Genre } from '../interfaces/genre.entity';

@Injectable()
export class CreateGenreValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    super();
  }
  async transform(genre: CreateGenreDto): Promise<CreateGenreDto> {
    const result = await this.genreRepository.find({
      where: {
        name: genre.name,
      },
    });

    if (result) throw new ForbiddenException('This genre already exists');

    return Promise.resolve(genre);
  }
}
