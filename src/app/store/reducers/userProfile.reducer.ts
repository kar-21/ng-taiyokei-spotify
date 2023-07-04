import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as UserProfileActions from '../actions/userProfile.action';
import { initialUserProfileState } from '../states/userProfile.state';

export const userProfileReducer = createReducer(
  initialUserProfileState,
  on(UserProfileActions.getUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: {
      ...profile,
    },
  })),
  on(
    UserProfileActions.setToken,
    (
      state,
      { access_token, scope, expires_in, token_type, refresh_token }
    ) => ({
      ...state,
      token: {
        access_token,
        scope,
        expires_in,
        token_type,
        refresh_token,
      },
    })
  )
);
