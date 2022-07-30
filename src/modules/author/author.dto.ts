import { IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNumber()
  id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email?: string;
}
