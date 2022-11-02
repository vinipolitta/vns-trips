import { AccountService } from './../core/services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { User } from '@app/shared/interfaces/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this.accountService.curentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer  ${currentUser.token}`,
          },
        });
      }
    });

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          localStorage.removeItem('currentUser');
        }
        return throwError(error);
      })
    );
  }
}
