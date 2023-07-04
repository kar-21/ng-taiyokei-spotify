import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ProfileModel } from 'src/app/model/profile.model';
import { IAppState } from 'src/app/store/states/app.state';
import { getUserProfile } from 'src/app/store/actions/userProfile.action';
import { selectUserProfile } from 'src/app/store/selectors/userProfile.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileData: ProfileModel = {} as ProfileModel;

  constructor(private store: Store<IAppState>) {
    
    this.store.dispatch(getUserProfile());
    this.store
      .pipe(select(selectUserProfile))
      .subscribe((profileData: ProfileModel) => {
        this.profileData = profileData;
      });
  }
}
