import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../interfaces/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  allCustomers() {
    return this.userService.findAll();
  }

  @Get(':id')
  oneCustomer(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  aCustomer(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
