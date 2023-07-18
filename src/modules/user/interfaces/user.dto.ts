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
  MinLength,
} from 'class-validator';
import { ROLES_ENUM } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    required: true,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  name: string;

  @ApiProperty({
    name: 'age',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  age: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5)
  password: string;

  @ApiProperty({
    name: 'role',
    enum: ROLES_ENUM,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ROLES_ENUM)
  role: ROLES_ENUM;
}

export class UpdateUserDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    required: false,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1)
  name: string;

  @ApiProperty({
    name: 'age',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  age: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  // @ApiProperty({
  //   name: 'name',
  //   type: 'string',
  //   required: false,
  // })
  // @IsOptional()
  // @IsEnum(ROLES_ENUM)
  // role: ROLES_ENUM;
}
