import { ProfileModel } from './../../model/profile.model';
import { initialUserProfileState } from './userProfile.state';

export interface IAppState {
  userProfile: ProfileModel;
}

export const initialAppState: IAppState = {
  userProfile: initialUserProfileState,
};
