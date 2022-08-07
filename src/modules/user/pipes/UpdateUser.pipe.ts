import {
  Injectable,
  ValidationPipe,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../interfaces/user.dto';
import { User } from '../interfaces/user.entity';

@Injectable()
export class UpdateUserValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  async transform(userDto: CreateUserDto): Promise<CreateUserDto> {
    if (userDto.email) await this.checkEmail(userDto.email);

    return Promise.resolve(userDto);
  }

  private async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new ForbiddenException('Email already in use');
  }
}

@Injectable()
export class AuthorExistanceValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  async transform(
    id: string,
    // metadata: ArgumentMetadata,
  ): Promise<User> {
    this.validateId(id);

    const user = await this.userRepository.findOne({
      where: { id: +id },
    });

    if (!user) throw new NotFoundException(`User doesn't exist`);

    return Promise.resolve(user);
  }

  private validateId(id: string) {
    if (isNaN(Number(id))) throw new ForbiddenException('Id must be a number');
  }
}
