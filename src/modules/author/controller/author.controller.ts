import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuthorDto } from '../interfaces/author.dto';
import { AuthorService } from '../service/author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async allAuthors() {
    return this.authorService.findAll();
  }

  @Post()
  async anAuthor(@Body() author: CreateAuthorDto) {
    return this.authorService.create(author);
  }
}
