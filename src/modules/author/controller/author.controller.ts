import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthorDto } from '../interfaces/author.dto';
import { Author } from '../interfaces/author.entity';
import { CreateAuthorPipe } from '../pipes/CreateAuthor.pipe';
import { GetAuthorsPipe } from '../pipes/GetAuthors.pipe';
import { AuthorService } from '../service/author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  // query example: ?relations=books,otherRelation,another,etc
  @Get()
  async allAuthors(@Query(GetAuthorsPipe) relations: string[]) {
    return this.authorService.findAll(relations);
  }

  @Get(':id')
  async getOneAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Query(GetAuthorsPipe) relations: string[],
  ) {
    return this.authorService.findOne(id, relations);
  }

  @Post()
  async anAuthor(@Body(CreateAuthorPipe) author: CreateAuthorDto) {
    return this.authorService.create(author as Author);
  }
}
