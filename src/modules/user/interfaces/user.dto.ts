import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

enum ROLES_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

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
  @IsEnum(ROLES_ENUM)
  role: ROLES_ENUM;
}
