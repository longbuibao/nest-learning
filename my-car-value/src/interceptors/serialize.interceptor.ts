import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request in handled by the request handler
    console.log('Im running before the handler', context)

    //Look like side effect in react
    return next.handle().pipe(
      map((data: any) => {
        console.log('Im running before response is sent out', data)
      }),
    )
  }
}
