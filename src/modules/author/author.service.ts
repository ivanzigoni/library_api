import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  public async findAll() {
    return this.authorRepository.find({ relations: ['books'] });
  }

  public async findOne(id: string) {
    return this.authorRepository.findOne({ where: { id: +id } });
  }

  public async create(body: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(body);

    return this.authorRepository.save(newAuthor);
  }
}
