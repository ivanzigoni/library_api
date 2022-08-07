import 'dotenv/config';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';

const { HASH_SALT } = process.env;

export enum ROLES_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  toJSON() {
    // removes password from api return
    return instanceToPlain(this);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(HASH_SALT));
  }

  @Column()
  email: string;

  @Column()
  role: ROLES_ENUM;
}
