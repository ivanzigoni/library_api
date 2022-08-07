import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './interfaces/user.entity';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // lista de repositórios usados por esse módulo
  controllers: [UserController], // lista de controllers atrelados ao módulo
  providers: [UserService], // lista de services atrelados ao módulo
})
export class UserModule {}
