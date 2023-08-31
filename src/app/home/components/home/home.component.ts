import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  routePath = '';
  isMobilePhone = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.route.url.subscribe((event) => {
      console.log(event);
    });
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

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((value) => {
      console.log('>>>>> bread', value);
    });
  }
}
