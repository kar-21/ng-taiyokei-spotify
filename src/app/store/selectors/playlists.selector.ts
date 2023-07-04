import { createSelector } from '@ngrx/store';

import { IPlaylistsState } from '../states/playlists.state';
import { IAppState } from '../states/app.state';

const getPlaylists = (state: IAppState) => state.playlists;

export const selectPlaylists = createSelector(
  getPlaylists,
  (state: IPlaylistsState) => state
);
