import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthorDto } from '../interfaces/author.dto';
import { Author } from '../interfaces/author.entity';
import { CreateAuthorPipe } from '../pipes/CreateAuthor.pipe';
import { AuthorService } from '../service/author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async allAuthors() {
    return this.authorService.findAll();
  }

  @Get(':id')
  async getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorService.findOne(id);
  }

  @Post()
  async anAuthor(@Body(CreateAuthorPipe) author: CreateAuthorDto) {
    return this.authorService.create(author as Author);
  }
}
