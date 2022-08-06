import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RelationsValidationPipe } from 'src/common/pipes/RelationsValidationPipe';
import { CreateGenreDto } from '../interfaces/genre.dto';
import { GenreService } from '../service/genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  allGenres() {
    return this.genreService.findAll();
  }

  @Get(':id')
  oneGenre(
    @Param('id', ParseIntPipe) id: string,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.genreService.findOne(id);
  }

  @Post()
  addGenre(@Body() genre: CreateGenreDto) {
    return this.genreService.create(genre);
  }
}
