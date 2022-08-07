import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RelationsValidationPipe } from 'src/common/pipes/RelationsValidationPipe.pipe';
import { CreateGenreDto, UpdateGenreDto } from '../interfaces/genre.dto';
import { Genre } from '../interfaces/genre.entity';
import { CreateGenreValidationPipe } from '../pipes/CreateGenre.pipe';
import {
  GenreExistanceValidationPipe,
  UpdateGenreValidationPipe,
} from '../pipes/UpdateGenre.pipe';
import { GenreService } from '../service/genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  findOneGenre(@Query(RelationsValidationPipe) relations: string[]) {
    return this.genreService.findAll(relations);
  }

  @Get(':id')
  findAllGenres(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.genreService.findOne(id, relations);
  }

  @Post()
  addGenre(@Body(CreateGenreValidationPipe) payload: CreateGenreDto) {
    return this.genreService.create(payload);
  }

  @Put(':id')
  updateGenre(
    @Param('id', GenreExistanceValidationPipe) genre: Genre,
    @Body(UpdateGenreValidationPipe) payload: UpdateGenreDto,
  ) {
    return this.genreService.update(genre, payload);
  }
}
