import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../interfaces/user.dto';
import { User } from '../interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findAll() {
    return this.userRepository.find();
  }

  public findOne(id: number) {
    return this.userRepository.findOne({ where: { id: +id } });
  }

  public async create(payload: CreateUserDto) {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  public async update(user: User, payload: UpdateUserDto) {
    const newUser = this.userRepository.create({
      ...user,
      ...payload,
    });

    return this.userRepository.save(newUser);
  }
}
