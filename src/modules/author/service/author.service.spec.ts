import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../../book/book.module';
import { Book } from '../../book/interfaces/book.entity';
import { GenreModule } from '../../genre/genre.module';
import { Genre } from '../../genre/interfaces/genre.entity';
import { User } from '../../user/interfaces/user.entity';
import { UserModule } from '../../user/user.module';
import { AuthorModule } from '../author.module';
import { Author } from '../interfaces/author.entity';
import { AuthorService } from './author.service';

const generateTestingModule = async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [Author],
        synchronize: true,
      }),
    ],
  }).compile();
  return testingModule;
};

describe('AuthorService', async () => {
  const testingModule = await generateTestingModule();
  const service = testingModule.get<AuthorService>(AuthorService);

  it('should something', () => {
    expect(service).toBeDefined();
  });
});

// describe('AuthorService', () => {
//   let service: AuthorService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthorService],
//     }).compile();

//     service = module.get<AuthorService>(AuthorService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
