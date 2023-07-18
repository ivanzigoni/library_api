import 'dotenv/config';
import { ApiProperty } from '@nestjs/swagger';
import { ROLES_ENUM } from './user.entity';

export class UserResponse {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    name: 'age',
    type: 'string',
  })
  age: string;

  // password: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    name: 'role',
    enum: ROLES_ENUM,
  })
  role: ROLES_ENUM;
}
