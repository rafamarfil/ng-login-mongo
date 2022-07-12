import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }

  // private handleErrorResponse(errorResponse: any): Observable<HttpEvent<any>> {
  //   // console.log('error at interceptor', errorResponse);

  //   if (errorResponse instanceof TimeoutError) {
  //     return throwError('Timeout Exception');
  //   }

  //   switch (errorResponse.status) {
  //     case 401: // Unauthorized
  //       break;
  //     case 503: // Service Unavailable
  //       break;
  //     case 503: // Internal Server Error
  //       break;
  //     default: // Other Error
  //   }

  //   let customError = new HttpError();
  //   try {
  //     customError = HttpError.initWithCode(errorResponse.error.errors[0].code);
  //   } catch (e) {}

  //   return throwError(customError);
  // }
}
