import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  isLoggedIn: boolean = false;
  constructor(private router: Router) {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  handleLoginClick = () => {
    this.router.navigateByUrl('/login');
  };

  handleProfileClick = () => {
    this.router.navigateByUrl('/profile');
  };
}
