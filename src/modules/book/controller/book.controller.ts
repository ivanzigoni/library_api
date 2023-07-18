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
import { CreateBookDto, UpdateBookDto } from '../interfaces/book.dto';
import { Book } from '../interfaces/book.entity';
import { CreateBookValidationPipe } from '../pipes/CreateBook.pipe';
import {
  BookExistanceValidationPipe,
  UpdateBookDtoValidationPipe,
} from '../pipes/UpdateBook.pipe';
import { BookService } from '../service/book.service';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookResponse } from '../interfaces/book.api';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @ApiResponse({
    status: '2XX',
    type: [BookResponse],
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    description: 'relations separated by comma',
    required: false,
  })
  @Get()
  async getAllBooks(@Query(RelationsValidationPipe) relations: string[]) {
    return this.bookService.findAll(relations);
  }

  @ApiResponse({
    status: '2XX',
    type: BookResponse,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    description: 'relations separated by comma',
    required: false,
  })
  @Get(':id')
  async getOneBook(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.bookService.findOne(id, relations);
  }

  @ApiResponse({
    status: '2XX',
    type: BookResponse,
  })
  @ApiBody({
    type: CreateBookDto,
  })
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
