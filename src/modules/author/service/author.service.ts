import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../interfaces/author.dto';
import { Author } from '../interfaces/author.entity';

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

  public async create(author: Author) {
    return this.authorRepository.save(author);
  }
}
