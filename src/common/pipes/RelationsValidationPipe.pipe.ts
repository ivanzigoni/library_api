import {
  Injectable,
  ValidationPipe,
  ValidationError,
  NotFoundException,
} from '@nestjs/common';
import { AUTHOR_RELATIONS } from 'src/modules/author/interfaces/author.entity';
import { BOOK_RELATIONS } from 'src/modules/book/interfaces/book.entity';
import { GENRE_RELATIONS } from 'src/modules/genre/interfaces/genre.entity';

const RELATIONS = {
  author: AUTHOR_RELATIONS,
  book: BOOK_RELATIONS,
  genre: GENRE_RELATIONS,
};

@Injectable()
export class RelationsValidationPipe extends ValidationPipe {
  async transform(query: { entity: string; relations: string }): Promise<any> {
    const { entity, relations } = query;

    if (!relations || !entity) return Promise.resolve([]);

    const relationsArray = relations.split(',');

    await this.validate({ relationsArray, entity });
    return Promise.resolve(relationsArray);
  }
  protected async validate(
    object: { relationsArray: string[]; entity: string },
    // validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> {
    const { relationsArray, entity } = object;

    const relationsByEntity = RELATIONS[entity];

    if (!relationsByEntity)
      throw new NotFoundException('Relations not found for this entity');

    relationsArray.forEach((queryRelation) => {
      const result = relationsByEntity.find(
        (relation) => relation === queryRelation,
      );

      if (!result) throw new NotFoundException('Relation not found');
    });

    return Promise.resolve([] as ValidationError[]);
  }
}
