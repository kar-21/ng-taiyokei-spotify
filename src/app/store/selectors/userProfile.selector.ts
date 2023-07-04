import { createSelector } from '@ngrx/store';

import { IUserProfile } from './../states/userProfile.state';
import { IAppState } from './../states/app.state';

const getUserProfile = (state: IAppState) => state.userProfile;

export const selectUserProfile = createSelector(
  getUserProfile,
  (state: IUserProfile) => state.profile
);

export const selectToken = createSelector(
  getUserProfile,
  (state: IUserProfile) => state.token
);
