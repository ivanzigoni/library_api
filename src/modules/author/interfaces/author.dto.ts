import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    name: 'first_name',
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    name: 'last_name',
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    name: 'email',
    required: true,
    type: 'string',
  })
  @IsEmail()
  email: string;
}

export class UpdateAuthorDto {
  @ApiProperty({
    name: 'first_name',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    name: 'last_name',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    name: 'email',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsEmail()
  email: string;
}
