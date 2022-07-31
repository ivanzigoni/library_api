import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controller/customer.controller';
import { Customer } from './interfaces/customer.entity';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // lista de repositórios usados por esse módulo
  controllers: [CustomerController], // lista de controllers atrelados ao módulo
  providers: [CustomerService], // lista de services atrelados ao módulo
})
export class CustomerModule {}
