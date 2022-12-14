import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookGenreJoinTable1659392623618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    
      CREATE TABLE book_genre (
        book_id int NOT NULL,
        genre_id int NOT NULL,
        FOREIGN KEY (book_id) REFERENCES book(id),
        FOREIGN KEY (genre_id) REFERENCES genre(id),
        PRIMARY KEY (book_id, genre_id)
      );
    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

      DROP TABLE book_genre

    `);
  }
}
