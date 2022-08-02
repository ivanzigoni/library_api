import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from '../interfaces/genre.dto';
import { Genre } from '../interfaces/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  public async findAll() {
    return this.genreRepository.find();
  }

  public async findOne(id: string) {
    return this.genreRepository.findOne({ where: { id: +id } });
  }

  public async create(body: CreateGenreDto) {
    const genreAlreadyExists = await this.genreRepository.findOne({
      where: { name: body.name },
    });

    if (genreAlreadyExists) {
      throw new ForbiddenException({
        message: `The "${body.name}" genre already exists.`,
      });
    }

    const newGenre = this.genreRepository.create(body);

    return this.genreRepository.save(newGenre);
  }
}
