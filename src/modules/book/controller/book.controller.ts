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
import { CreateBookDto } from '../interfaces/book.dto';
import { CreateBookValidationPipe } from '../pipes/CreateBook.pipe';
import { BookService } from '../service/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query(RelationsValidationPipe) relations: string[]) {
    return this.bookService.findAll(relations);
  }

  @Get(':id')
  async getOneBook(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.bookService.findOne(id, relations);
  }

  @Post()
  async postOneBook(@Body(CreateBookValidationPipe) book: CreateBookDto) {
    return this.bookService.create(book);
  }
}
