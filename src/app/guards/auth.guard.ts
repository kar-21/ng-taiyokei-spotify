import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';

import { selectToken } from './../store/selectors/userProfile.selector';
import { IAppState } from '../store/states/app.state';
import { TokenModal } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<IAppState>) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) =>
      this.store
        .pipe(select(selectToken))
        .subscribe((token: TokenModal) => {
          if (token.access_token) {
            resolve(true);
          } else {
            this.router.navigateByUrl('login');
            resolve(false);
          }
        })
    );
  }
}
