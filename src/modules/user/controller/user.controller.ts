import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../interfaces/user.dto';
import { CreateUserValidationPipe } from '../pipes/CreateUser.pipe';
import {
  AuthorExistanceValidationPipe,
  UpdateUserValidationPipe,
} from '../pipes/UpdateUser.pipe';
import { User } from '../interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  postOneUser(@Body(CreateUserValidationPipe) payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  updateOneUser(
    @Param('id', AuthorExistanceValidationPipe) user: User,
    @Body(UpdateUserValidationPipe) payload: UpdateUserDto,
  ) {
    return this.userService.update(user, payload);
  }
}
