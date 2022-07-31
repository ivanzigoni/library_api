import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookDto } from '../interfaces/book.dto';
import { BookService } from '../service/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async allBooks() {
    return this.bookService.findAll();
  }

  @Post()
  async aBook(@Body() book: CreateBookDto) {
    return this.bookService.create(book);
  }
}
