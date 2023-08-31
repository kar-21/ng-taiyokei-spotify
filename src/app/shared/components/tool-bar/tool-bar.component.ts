import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  isLoggedIn: boolean = false;
  routePath = '';
  isMobilePhone = false;
  
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePath = event.url;
      }
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result: BreakpointState) => {
        this.isMobilePhone = result.matches;
      });
  }

  handleLoginClick = () => {
    this.router.navigateByUrl('/login');
  };

  handleProfileClick = () => {
    this.router.navigateByUrl('/profile');
  };
}
