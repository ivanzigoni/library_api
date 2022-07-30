import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBook1659199341084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE author (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      email varchar(255)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE author;
  `);
  }
}
