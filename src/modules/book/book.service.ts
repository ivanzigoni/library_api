import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookReposiroty: Repository<Book>,
  ) {}

  public async findAll() {
    return this.bookReposiroty.find();
  }
}
