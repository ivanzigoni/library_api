import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordToUser1659908881836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

      ALTER TABLE user
      ADD password varchar(255) NOT NULL;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

      ALTER TABLE user
      ADD password varchar(255) NOT NULL;
      `);
  }
}
