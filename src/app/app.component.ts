import { Component } from '@angular/core';
import { IAppState } from './store/states/app.state';
import { Store, select } from '@ngrx/store';
import { selectedTrackUri } from './store/selectors/selectedItem.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-taiyokei-spotify';
  trackUri = '';

  constructor(
    private store: Store<IAppState>,
  ) {
    this.store.pipe(select(selectedTrackUri)).subscribe((trackUri: string) => {
      this.trackUri = trackUri;
    });
  }
}
