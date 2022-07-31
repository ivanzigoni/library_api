import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CustomerModule } from '../customer/customer.module';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/author.module';
import config from '../../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    BookModule,
    CustomerModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
