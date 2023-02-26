import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent {
  constructor(
    private route: ActivatedRoute,
    private cookie: CookieService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('Params', params['token']);
      sessionStorage.setItem('token', params['token']);
      this.router.navigateByUrl('');
    });
  }
}
