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
import { CreateAuthorDto, UpdateAuthorDto } from '../interfaces/author.dto';
import { Author } from '../interfaces/author.entity';
import { CreateAuthorValidationPipe } from '../pipes/CreateAuthor.pipe';
import { RelationsValidationPipe } from 'src/common/pipes/RelationsValidationPipe.pipe';
import { AuthorService } from '../service/author.service';
import { AuthorExistanceValidationPipe } from '../pipes/UpdateAuthor.pipe';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  // query example: ?relations=books,otherRelation,another,etc
  @Get()
  async getAllAuthors(@Query(RelationsValidationPipe) relations: string[]) {
    return this.authorService.findAll(relations);
  }

  @Get(':id')
  async getOneAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.authorService.findOne(id, relations);
  }

  @Post()
  async createOneAuthor(
    @Body(CreateAuthorValidationPipe) author: CreateAuthorDto,
  ) {
    return this.authorService.create(author as Author);
  }

  @Put(':id')
  async updateOneAuthor(
    @Param('id', AuthorExistanceValidationPipe) author: Author,
    @Body() payload: UpdateAuthorDto,
  ) {
    return this.authorService.update(payload, author);
  }
}
