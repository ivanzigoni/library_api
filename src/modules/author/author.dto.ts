import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email?: string;
}
