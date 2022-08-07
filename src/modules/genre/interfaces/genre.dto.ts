import { IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @Length(1)
  name: string;
}

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  @Length(1)
  name: string;
}
