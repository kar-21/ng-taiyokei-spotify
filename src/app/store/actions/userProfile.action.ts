import { createAction, props } from '@ngrx/store';

import { ProfileModel } from './../../model/profile.model';
import { TokenModal } from 'src/app/model/login.model';

export enum EUserProfile {
  GET_USER_PROFILE = 'Get [user] profile',
  GET_USER_PROFILE_SUCCESS = 'Get [user] profile success',
  SET_USER_TOKEN = 'Set [user] token',
}

export const getUserProfile = createAction(EUserProfile.GET_USER_PROFILE);

export const getUserProfileSuccess = createAction(
  EUserProfile.GET_USER_PROFILE_SUCCESS,
  props<{ profile: ProfileModel }>()
);

export const setToken = createAction(
  EUserProfile.SET_USER_TOKEN,
  props<TokenModal>()
);
