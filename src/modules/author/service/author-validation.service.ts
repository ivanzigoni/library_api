import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAuthorDto } from '../interfaces/author.dto';

@Injectable()
export class AuthorValidationService {
  public async createValidation(plainObject: Partial<CreateAuthorDto>) {
    const instance = plainToInstance(CreateAuthorDto, plainObject);

    const err = await validate(instance);

    if (err.length) {
      console.log(
        err.reduce((acc, e) => {
          acc.push(e.constraints);
          return acc;
        }, []),
      );
      throw new Error(err.toString());
    }
  }
}
