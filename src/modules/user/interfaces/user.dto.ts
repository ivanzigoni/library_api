import { classToPlain, Exclude, instanceToPlain } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min, MinLength,
} from 'class-validator';
import { ROLES_ENUM } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  age: string;

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
  @IsString()
  @MinLength(10)
  age: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(ROLES_ENUM)
  role: ROLES_ENUM;
}
