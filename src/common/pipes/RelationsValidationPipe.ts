import {
  Injectable,
  ValidationPipe,
  ValidationError,
  NotFoundException,
} from '@nestjs/common';
import { AUTHOR_RELATIONS } from 'src/modules/author/interfaces/author.entity';

const RELATIONS = {
  author: AUTHOR_RELATIONS,
};

@Injectable()
export class RelationsValidationPipe extends ValidationPipe {
  async transform(
    query: { entity: string; relations: string },
    // metadata: ArgumentMetadata,
  ): Promise<any> {
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
