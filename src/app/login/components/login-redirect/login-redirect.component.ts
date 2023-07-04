import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/store/states/app.state';
import { setToken } from 'src/app/store/actions/userProfile.action';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>
  ) {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      const expiresDate = new Date();
      expiresDate.setSeconds(expiresDate.getSeconds() + params['expires_in'] - 60);
      this.store.dispatch(
        setToken({
          access_token: params['access_token'],
          scope: params['scope'],
          token_type: params['token_type'],
          refresh_token: params['refresh_token'],
          expires_in:  expiresDate.getTime(),
        })
      );
      this.router.navigateByUrl('');
      // setTimeout(() => window.location.href = `http://localhost:4200`)
    });
  }
}
