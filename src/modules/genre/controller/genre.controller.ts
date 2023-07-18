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
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenreResponse } from '../interfaces/genre.api';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @ApiResponse({
    status: '2XX',
    type: GenreResponse,
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    description: 'relations separated by comma',
    required: false,
  })
  @Get()
  findOneGenre(@Query(RelationsValidationPipe) relations: string[]) {
    return this.genreService.findAll(relations);
  }

  @ApiResponse({
    status: '2XX',
    type: GenreResponse,
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    description: 'relations separated by comma',
    required: false,
  })
  @Get(':id')
  findAllGenres(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.genreService.findOne(id, relations);
  }

  @ApiResponse({
    status: '2XX',
    type: GenreResponse,
  })
  @ApiBody({
    type: CreateGenreDto,
    required: true,
  })
  @Post()
  addGenre(@Body(CreateGenreValidationPipe) payload: CreateGenreDto) {
    return this.genreService.create(payload);
  }

  @ApiResponse({
    status: '2XX',
    type: GenreResponse,
  })
  @ApiBody({
    type: UpdateGenreDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @Put(':id')
  updateGenre(
    @Param('id', GenreExistanceValidationPipe) genre: Genre,
    @Body(UpdateGenreValidationPipe) payload: UpdateGenreDto,
  ) {
    return this.genreService.update(genre, payload);
  }
}
