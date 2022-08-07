import { classToPlain, Exclude, instanceToPlain } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ROLES_ENUM } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5)
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES_ENUM)
  role: ROLES_ENUM;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1)
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(10)
  age: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(ROLES_ENUM)
  role: ROLES_ENUM;
}
