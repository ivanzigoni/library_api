import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../interfaces/author.dto';
import { Author, AUTHOR_RELATIONS } from '../interfaces/author.entity';
import { CreateAuthorValidationPipe } from '../pipes/CreateAuthor.pipe';
import { RelationsValidationPipe } from 'src/common/pipes/RelationsValidationPipe.pipe';
import { AuthorService } from '../service/author.service';
import { AuthorExistanceValidationPipe } from '../pipes/UpdateAuthor.pipe';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorResponse } from '../interfaces/author.api';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @ApiResponse({ type: [AuthorResponse], status: '2XX' })
  @ApiQuery({
    name: 'relations',
    description: 'relations separated by commas',
    required: false,
    example: AUTHOR_RELATIONS.toString(),
  })
  // query example: ?relations=books,otherRelation,another,etc
  @Get()
  async getAllAuthors(
    @Query(RelationsValidationPipe) relations: string[],
  ): Promise<AuthorResponse[]> {
    return this.authorService.findAll(relations);
  }

  @ApiResponse({ type: AuthorResponse, status: '2XX' })
  @ApiQuery({
    name: 'relations',
    description: 'relations separated by commas',
    required: false,
    example: AUTHOR_RELATIONS.toString(),
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Get(':id')
  async getOneAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @Query(RelationsValidationPipe) relations: string[],
  ) {
    return this.authorService.findOne(id, relations);
  }

  @ApiResponse({ type: AuthorResponse, status: '2XX' })
  @ApiBody({
    type: CreateAuthorDto,
    description: 'values for registering new author into the system',
  })
  @Post()
  async createOneAuthor(
    // @Body(CreateAuthorValidationPipe) author: CreateAuthorDto,
    @Body() author: CreateAuthorDto,
  ) {
    return this.authorService.create(author);
  }

  @ApiResponse({ type: AuthorResponse, status: '2XX' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    type: UpdateAuthorDto,
    required: true,
  })
  @Put(':id')
  async updateOneAuthor(
    @Param('id', AuthorExistanceValidationPipe) author: Author,
    @Body() payload: UpdateAuthorDto,
  ) {
    return this.authorService.update(payload, author);
  }
}
