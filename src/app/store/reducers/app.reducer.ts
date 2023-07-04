import { categoriesReducer } from './categories.reducer';
import { playlistReducer } from './playlist.reducer';
import { selectedItemReducer } from './selectedItem.reducer';
import { tracksReducer } from './tracks.reducer';
import { userProfileReducer } from './userProfile.reducer';

export const appReducer = {
  userProfile: userProfileReducer,
  categories: categoriesReducer,
  playlists: playlistReducer,
  tracks: tracksReducer,
  selectedItem: selectedItemReducer
};
