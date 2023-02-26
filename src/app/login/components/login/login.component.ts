import { Component } from '@angular/core';

import { LoginModel } from './../../../model/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  handleLoginClick = () => {
    this.loginService.login().subscribe((data: LoginModel) => {
      window.location.href = data.url;
    });
  };
}
