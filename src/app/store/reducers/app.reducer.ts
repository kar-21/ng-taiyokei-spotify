import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { userProfileReducer } from './userProfileReducer';

export const appReducer = {
  userProfile: userProfileReducer,
};
