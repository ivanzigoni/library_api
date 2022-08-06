import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../interfaces/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  public async findAll(relations: string[]) {
    return this.authorRepository.find({ relations });
  }

  public async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) throw new NotFoundException('Author not found');
    else return author;
  }

  public async create(author: Author) {
    return this.authorRepository.save(author);
  }
}
