import { Genre } from 'src/modules/genre/interfaces/genre.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../../author/interfaces/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author_id: number;

  @ManyToOne(() => Author, (author) => author.id)
  @JoinColumn({ foreignKeyConstraintName: 'book_ibfk_1', name: 'author_id' })
  author: Author;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'book_genre',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];
}
