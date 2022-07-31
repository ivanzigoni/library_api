import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../interfaces/customer.dto';

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
