import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  public findAll() {
    return this.customerRepository.find();
  }

  public findOne(id: string) {
    return this.customerRepository.findOne({ where: { id: +id } });
  }

  public async create(body: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(body);
    return this.customerRepository.save(newCustomer);
  }
}
