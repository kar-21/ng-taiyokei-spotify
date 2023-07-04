import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import {
  tap,
  switchMap,
  take,
  first,
  flatMap,
  catchError,
  BehaviorSubject,
  throwError,
} from 'rxjs';

import { TokenModal } from 'src/app/model/login.model';
import { selectToken } from 'src/app/store/selectors/userProfile.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { getValue } from '../utilities/getValue.utility';
import { LoginService } from './../../login/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private store: Store<IAppState>,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  addBearerToken(request: HttpRequest<any>, token: TokenModal) {
    return request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${token.access_token}`
      ),
    });
  }

  openErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 10000 });
  }

  handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    if (!request.url.includes('login')) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
      }
      const token = getValue(this.store.pipe(select(selectToken)));
      if (token) {
        return this.loginService.refreshToken(token.refresh_token).pipe(
          switchMap((token: TokenModal) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token);
            return next.handle(this.addBearerToken(request, token));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            console;
            return throwError(() => new Error(error));
          })
        );
      } else {
        this.openErrorSnackbar(`${HttpStatusCode.Unauthorized}: Unauthorized`);
        return throwError(error);
      }
    } else {
      this.openErrorSnackbar(`Ops! Something went wrong`);
      return throwError(error);
    }
  }

  handleAPIErrors(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          return this.handleUnauthorizedError(request, next, error);
        default:
          this.openErrorSnackbar(
            `${HttpStatusCode.Unauthorized}: Unauthorized`
          );
          return throwError(error);
      }
    } else {
      return throwError(error);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = getValue(this.store.pipe(select(selectToken)));
    return next.handle(this.addBearerToken(request, token)).pipe(
      catchError((error) => {
        this.handleAPIErrors(request, next, error);
        return throwError(() => new Error(error));
      })
    );
  }
}
