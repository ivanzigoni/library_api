import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto, UpdateGenreDto } from '../interfaces/genre.dto';
import { Genre } from '../interfaces/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  public async findAll(relations: string[]) {
    return this.genreRepository.find({ relations });
  }

  public async findOne(id: number, relations: string[]) {
    return this.genreRepository.findOne({ where: { id }, relations });
  }

  public async create(payload: CreateGenreDto) {
    const newGenre = this.genreRepository.create(payload);

    return this.genreRepository.save(newGenre);
  }

  public async update(genre: Genre, payload: UpdateGenreDto) {
    const updatedGenre = this.genreRepository.create({
      ...genre,
      ...payload,
    });

    return this.genreRepository.save(updatedGenre);
  }
}
