import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  isLoggedIn: boolean = false;
  routePath = '';
  constructor(private router: Router) {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePath = event.url;
      }
    });
  }

  handleLoginClick = () => {
    this.router.navigateByUrl('/login');
  };

  handleProfileClick = () => {
    this.router.navigateByUrl('/profile');
  };
}
