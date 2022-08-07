import { Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class TestPipe extends ValidationPipe {
  async transform(object: any, metadata: any): Promise<any> {
    console.log(typeof object);
    if (metadata.type === 'param') return Promise.resolve(5);
    return Promise.resolve(object);
  }
}
