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
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../interfaces/user.api';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    status: '2XX',
    type: UserResponse,
  })
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @ApiResponse({
    status: '2XX',
    type: UserResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiResponse({
    status: '2XX',
    type: UserResponse,
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @Post()
  postOneUser(@Body(CreateUserValidationPipe) payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiResponse({
    status: '2XX',
    type: UserResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
  })
  @Put(':id')
  updateOneUser(
    @Param('id', AuthorExistanceValidationPipe) user: User,
    @Body(UpdateUserValidationPipe) payload: UpdateUserDto,
  ) {
    return this.userService.update(user, payload);
  }
}
