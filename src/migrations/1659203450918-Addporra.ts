import { MigrationInterface, QueryRunner } from 'typeorm';

export class Addporra1659203450918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE book (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title varchar(255) NOT NULL,
      author_id int NOT NULL,
      FOREIGN KEY (author_id) REFERENCES author(id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE book;
  `);
  }
}
