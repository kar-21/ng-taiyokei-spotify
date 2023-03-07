import { ProfileModel } from './../../model/profile.model';
import { createSelector } from '@ngrx/store';
import { IAppState } from './../states/app.state';

const getUserProfile = (state: IAppState) => state.userProfile;

export const selectUserProfile = createSelector(
  getUserProfile,
  (state: ProfileModel) => state
);
