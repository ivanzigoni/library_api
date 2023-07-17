import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordToUser1659908881836 implements MigrationInterface {
  private async createUser(queryRunner: QueryRunner) {
    await queryRunner.query(`
      CREATE TABLE user (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name varchar(255) NOT NULL,
      age varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      role varchar(255) NOT NULL
      );
    `);
  }

  private async dropUser(queryRunner: QueryRunner) {
    await queryRunner.query(`
        DELETE FROM user;
    `);

    await queryRunner.query(`
        DROP TABLE user;
      );
    `);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUser(queryRunner);

    await queryRunner.query(`

      ALTER TABLE user
      ADD password varchar(255) NOT NULL;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropUser(queryRunner);

    await queryRunner.query(`

      ALTER TABLE user
      ADD password varchar(255) NOT NULL;
      `);
  }
}
