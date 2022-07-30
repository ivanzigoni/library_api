import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  allCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  oneCustomer(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post()
  aCustomer(@Body() body: CreateCustomerDto) {
    return this.customerService.create(body);
  }
}
