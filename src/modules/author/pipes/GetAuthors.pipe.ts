import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  ValidationError,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AUTHOR_RELATIONS } from '../interfaces/author.entity';

@Injectable()
export class GetAuthorsPipe extends ValidationPipe {
  async transform(
    query: { relations: string },
    // metadata: ArgumentMetadata,
  ): Promise<any> {
    const { relations } = query;

    if (!relations) return Promise.resolve([]);

    const relationsArray = relations.split(',');

    await this.validate({ relationsArray });

    return Promise.resolve(relationsArray);
  }
  protected async validate(
    object: { relationsArray: string[] },
    // validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> {
    const { relationsArray } = object;

    relationsArray.forEach((queryRelation) => {
      const result = AUTHOR_RELATIONS.find(
        (relation) => relation === queryRelation,
      );

      if (!result) throw new NotFoundException('Relation not found');
    });

    return Promise.resolve([] as ValidationError[]);
  }
}
