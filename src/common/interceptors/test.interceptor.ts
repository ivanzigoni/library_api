import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, find, map, Observable, OperatorFunction, tap } from 'rxjs';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  // constructor(private param: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const teste = context.switchToHttp().getRequest() as Request;

    // console.log(this.param);
    console.log('in');

    return next.handle().pipe(
      catchError((err) => {
        return err;
      }),
      // find((value, index) => {
      //   return true;
      // }),
      map((data: any[]) => {
        return data.map((author) => author.id);
      }),
      // tap((obs: any[]) => {
      //   return obs.map((author) => author.id);
      // }),
    );
  }
}
