import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenre1659301081383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE genre (
          id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name varchar(255) NOT NULL
        );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DROP TABLE genre;
      `,
    );
  }
}
