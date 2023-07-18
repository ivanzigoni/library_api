import { IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    required: true,
    minLength: 1,
  })
  @IsString()
  @Length(1)
  name: string;
}

export class UpdateGenreDto {
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
}
