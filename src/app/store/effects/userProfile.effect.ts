import { ProfileModel } from 'src/app/model/profile.model';
import * as UserProfileActions from './../actions/userProfile.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { ProfileService } from 'src/app/home/services/profile.service';

@Injectable()
export class UserProfileEffect {
  constructor(
    private store: Store,
    private actions: Actions,
    private profileService: ProfileService
  ) {}

  getUserProfile = createEffect(() =>
    this.actions.pipe(
      ofType(UserProfileActions.EUserProfile.GET_USER_PROFILE),
      switchMap(({ token }) => this.profileService.getProfile(token)),
      switchMap((userProfile: ProfileModel) =>
        of(UserProfileActions.getUserProfileSuccess({ profile: userProfile }))
      )
    )
  );
}
