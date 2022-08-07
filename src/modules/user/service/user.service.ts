import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../interfaces/user.dto';
import { User } from '../interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public findAll() {
    return this.userRepository.find();
  }

  public findOne(id: string) {
    return this.userRepository.findOne({ where: { id: +id } });
  }

  public async create(body: CreateUserDto) {
    const newCustomer = this.userRepository.create(body);
    return this.userRepository.save(newCustomer);
  }
}
