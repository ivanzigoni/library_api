import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { RelationsValidationPipe } from 'src/common/pipes/RelationsValidationPipe.pipe';
import { TestPipe } from 'src/common/pipes/TestPipe.pipe';
import { CreateBookDto, UpdateBookDto } from '../interfaces/book.dto';
import { Book } from '../interfaces/book.entity';
import { CreateBookValidationPipe } from '../pipes/CreateBook.pipe';
import {
  BookExistanceValidationPipe,
  UpdateBookDtoValidationPipe,
} from '../pipes/UpdateBook.pipe';
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

  @Put(':id')
  async updateOneBook(
    @Param('id', BookExistanceValidationPipe) book: Book,
    @Body(UpdateBookDtoValidationPipe) payload: UpdateBookDto,
  ) {
    return this.bookService.update(book, payload);
  }
}
