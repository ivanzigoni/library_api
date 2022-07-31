import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './controller/genre.controller';
import { Genre } from './interfaces/genre.entity';
import { GenreService } from './service/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
