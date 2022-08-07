import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  password: string;

  @Column()
  email: string;

  @Column()
  role: ROLES_ENUM;
}
