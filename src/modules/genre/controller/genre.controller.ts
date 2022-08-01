import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  oneGenre(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Post()
  addGenre(@Body() genre: CreateGenreDto) {
    return this.genreService.create(genre);
  }
}
