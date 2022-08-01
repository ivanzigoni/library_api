import { Genre } from 'src/modules/genre/interfaces/genre.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
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
  genres: Genre[];
}
