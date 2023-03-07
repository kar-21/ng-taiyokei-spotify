import { ProfileModel } from './../../model/profile.model';
import { createAction, props } from '@ngrx/store';

export enum EUserProfile {
  GET_USER_PROFILE = 'Get [user] profile',
  GET_USER_PROFILE_SUCCESS = 'Get [user] profile success',
}

export const getUserProfile = createAction(
  EUserProfile.GET_USER_PROFILE,
  props<{ token: string }>()
);

export const getUserProfileSuccess = createAction(
  'Get [user] profile success',
  props<{ profile: ProfileModel}>()
);

