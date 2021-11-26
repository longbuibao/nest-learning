import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

interface ClassConstructure {
  new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructure) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request in handled by the request handler

    //Looks like side effect in react
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
