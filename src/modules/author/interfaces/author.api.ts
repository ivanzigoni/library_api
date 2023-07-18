import { Book } from '../../book/interfaces/book.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BookResponse } from '../../book/interfaces/book.api';

export class AuthorResponse {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    name: 'first_name',
    type: 'string',
  })
  first_name: string;

  @ApiProperty({
    name: 'last_name',
    type: 'string',
  })
  last_name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    name: 'books',
    type: [BookResponse],
    required: false,
  })
  books?: BookResponse[];
}
