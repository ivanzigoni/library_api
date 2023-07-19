import { Module } from '@nestjs/common';
import { AuthorService } from './service/author.service';
import { AuthorController } from './controller/author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './interfaces/author.entity';
import { AuthorValidationService } from './service/author-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorValidationService],
  controllers: [AuthorController],
})
export class AuthorModule {}
