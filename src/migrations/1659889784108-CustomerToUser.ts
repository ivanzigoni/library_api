import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerToUser1659889784108 implements MigrationInterface {
  name = 'CustomerToUser1659889784108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

    ALTER TABLE user
    RENAME user,
    ADD role varchar(255); 

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

    ALTER TABLE user
    RENAME user,
    DROP COLUMN role;

    `);
  }
}
