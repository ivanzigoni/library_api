import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

export class UpdateAuthorDto extends CreateAuthorDto {}

export class AuthorRelationsDto {
  books?: string;
}
