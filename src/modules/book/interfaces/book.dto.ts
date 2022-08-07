import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  author_id: number;

  @IsArray()
  @ArrayMinSize(1)
  genres_ids: number[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  author_id: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  genres_ids: number[];
}
