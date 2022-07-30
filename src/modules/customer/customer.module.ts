import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // lista de repositórios usados por esse módulo
  controllers: [CustomerController], // lista de controllers atrelados ao módulo
  providers: [CustomerService], // lista de services atrelados ao módulo
})
export class CustomerModule {}
