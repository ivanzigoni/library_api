import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BookGenre {
  @PrimaryColumn()
  book_id: number;

  @PrimaryColumn()
  genre_id: number;
}
