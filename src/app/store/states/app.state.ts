import { initialCategoriesState, ICategoriesState } from './categories.state';
import { IPlaylistsState, initialPlaylistsState } from './playlists.state';
import { ISelectedItem, initialSelectedItemState } from './selectedItem.state';
import { ITracksState, initialTracksState } from './tracks.state';
import { initialUserProfileState, IUserProfile } from './userProfile.state';

export interface IAppState {
  userProfile: IUserProfile;
  categories: ICategoriesState;
  playlists: IPlaylistsState;
  tracks: ITracksState;
  selectedItem: ISelectedItem;
}

export const initialAppState: IAppState = {
  userProfile: initialUserProfileState,
  categories: initialCategoriesState,
  playlists: initialPlaylistsState,
  tracks: initialTracksState,
  selectedItem: initialSelectedItemState,
};
