import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    name: 'title',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'author_id',
    type: 'string',
    required: true,
  })
  @IsNumberString()
  @IsNotEmpty()
  author_id: number;

  @ApiProperty({
    name: 'genres_ids',
    type: [String],
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  genres_ids: number[];
}

export class UpdateBookDto {
  @ApiProperty({
    name: 'title',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    name: 'author_id',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  author_id: number;

  @ApiProperty({
    name: 'genres_ids',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  genres_ids: number[];
}
