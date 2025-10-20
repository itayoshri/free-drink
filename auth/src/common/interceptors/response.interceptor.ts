import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../dto/response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((response: T | ApiResponse<T> | { message: string; data: T }) => {
        if (
          typeof response === 'object' &&
          response !== null &&
          'success' in response
        ) {
          return response;
        }

        if (
          typeof response === 'object' &&
          response !== null &&
          'message' in response &&
          'data' in response
        ) {
          const { message, data } = response as { message: string; data: T };
          return {
            success: true,
            message,
            data,
          } satisfies ApiResponse<T>;
        }

        return {
          success: true,
          message: '',
          data: response,
        } satisfies ApiResponse<T>;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
