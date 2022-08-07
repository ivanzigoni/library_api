import { Injectable, ValidationPipe, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../interfaces/user.dto';
import { User } from '../interfaces/user.entity';

@Injectable()
export class CreateUserValidationPipe extends ValidationPipe {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  async transform(
    userDto: CreateUserDto,
    // metadata: ArgumentMetadata,
  ): Promise<CreateUserDto> {
    await this.checkEmail(userDto.email);

    return Promise.resolve(userDto);
  }

  private async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) throw new ForbiddenException('Email already in use');
  }
}
