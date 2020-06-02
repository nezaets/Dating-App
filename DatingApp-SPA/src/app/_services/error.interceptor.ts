import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === 401) {
          return throwError(httpErrorResponse.statusText);
        }

        const applicationError = httpErrorResponse.headers.get('Application-Errors');

        if (applicationError) {
          return throwError(applicationError);
        }

        const serverError = httpErrorResponse.error;

        let modalStateErrors = "";
        if (serverError.errors) {
          for (let serverErrorKey in serverError.errors) {
            modalStateErrors += serverError.errors[serverErrorKey].join("\n");
          }
        }

        return throwError(modalStateErrors || serverError || 'Server Error');

      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];
