import { Genre } from 'src/modules/genre/interfaces/genre.entity';
import { Author } from '../../author/interfaces/author.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GenreResponse } from '../../genre/interfaces/genre.api';
import { AuthorResponse } from '../../author/interfaces/author.api';

export class BookResponse {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    name: 'title',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    name: 'author_id',
    type: 'number',
  })
  author_id: number;

  @ApiProperty({
    name: 'author',
    type: () => AuthorResponse,
  })
  author: AuthorResponse;

  @ApiProperty({
    name: 'genres',
    type: [GenreResponse],
  })
  genres: GenreResponse[];
}

export const BOOK_RELATIONS = ['genres', 'author'];
