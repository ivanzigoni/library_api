import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  email: string;
}
