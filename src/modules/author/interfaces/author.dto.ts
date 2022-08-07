import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
