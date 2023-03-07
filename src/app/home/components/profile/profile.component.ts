import { selectUserProfile } from './../../../store/selectors/userProfile.selector';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ProfileModel } from 'src/app/model/profile.model';
import { IAppState } from 'src/app/store/states/app.state';
import { getUserProfile } from './../../../store/actions/userProfile.action';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileData: ProfileModel = {} as ProfileModel;

  constructor(private store: Store<IAppState>) {
    const token = sessionStorage.getItem('token');
    if (token) this.store.dispatch(getUserProfile({ token: token }));
    this.store
      .pipe(select(selectUserProfile))
      .subscribe((profileData: ProfileModel) => {
        this.profileData = profileData;
      });
  }
}
