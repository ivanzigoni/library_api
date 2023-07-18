import { ApiProperty } from '@nestjs/swagger';
import { BookResponse } from '../../book/interfaces/book.api';

export class GenreResponse {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    name: 'books',
    type: [BookResponse],
  })
  books: BookResponse[];
}

export const GENRE_RELATIONS = ['books'];
