import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  routePath = '';
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe((event) => {
      console.log(event);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePath = event.url;
      }
    });
  }
}
