import { createReducer, on } from '@ngrx/store';
import * as UserProfileActions from './../actions/userProfile.action';
import { initialUserProfileState } from './../states/userProfile.state';

export const userProfileReducer = createReducer(
  initialUserProfileState,
  on(UserProfileActions.getUserProfileSuccess, (state, { profile }) => ({
    ...profile,
  }))
);
