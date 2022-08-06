import {
  Body,
  Controller,
  Get,
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

  @Post()
  async anAuthor(@Body(CreateAuthorPipe) author: Author) {
    return this.authorService.create(author);
  }
}
