import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  switchMap,
  catchError,
  BehaviorSubject,
  throwError,
  Observable,
  ReplaySubject,
} from 'rxjs';

import { TokenModal } from 'src/app/model/login.model';
import { selectToken } from 'src/app/store/selectors/userProfile.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { getValue } from '../utilities/getValue.utility';
import { LoginService } from './../../login/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setToken } from 'src/app/store/actions/userProfile.action';

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

  appendAccessToken(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }

  addBearerToken(
    request: HttpRequest<any>,
    token: TokenModal
  ): Observable<HttpRequest<any>> {
    const returnObservable = new ReplaySubject<HttpRequest<any>>(1);
    if (request.url.includes('/login')) {
      returnObservable.next(request);
    } else if (new Date(token.expires_in) < new Date(Date.now())) {
      this.loginService
        .refreshToken(token.refresh_token)
        .subscribe((tokenParams: TokenModal) => {
          const expiresDate = new Date();
          expiresDate.setSeconds(expiresDate.getSeconds() + tokenParams['expires_in'] -  60);
          this.store.dispatch(
            setToken({
              access_token: tokenParams['access_token'],
              scope: tokenParams['scope'],
              token_type: tokenParams['token_type'],
              refresh_token: tokenParams['refresh_token'],
              expires_in: expiresDate.getTime(),
            })
          );
          returnObservable.next(
            this.appendAccessToken(request, tokenParams['access_token'])
          );
        });
    } else {
      returnObservable.next(
        this.appendAccessToken(request, token.access_token)
      );
    }

    return returnObservable;
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
        return (
          this.loginService
            .refreshToken(token.refresh_token)
            .subscribe((token: TokenModal) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token);
              this.addBearerToken(request, token).subscribe((request) => {
                next.handle(request);
              });
            }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => new Error(error));
          })
        );
      } else {
        this.openErrorSnackbar(`${HttpStatusCode.Unauthorized}: Unauthorized`);
        return throwError(() => new Error(error.message));
      }
    } else {
      this.openErrorSnackbar(`Ops! Something went wrong`);
      return throwError(() => new Error(error.message));
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
          // return this.handleUnauthorizedError(request, next, error);
        default:
          this.openErrorSnackbar(
            `${HttpStatusCode.InternalServerError}: Unauthorized`
          );
          return throwError(error);
      }
    } else {
      return throwError(error);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = getValue(this.store.pipe(select(selectToken)));
    return this.addBearerToken(request, token).pipe(
      switchMap((request: HttpRequest<any>) => {
        return next.handle(request);
      }),
      catchError((error) => {
        this.handleAPIErrors(request, next, error);
        return throwError(() => new Error(error));
      })
    );
  }
}
