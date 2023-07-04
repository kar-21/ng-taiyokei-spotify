import { createReducer, on } from '@ngrx/store';

import { initialPlaylistsState } from '../states/playlists.state';
import * as PlaylistsActions from '../actions/playlists.action';

export const playlistReducer = createReducer(
  initialPlaylistsState,
  on(
    PlaylistsActions.getPlaylistsSuccess,
    (state, { playlists, total, previous }) => ({
      ...state,
      playlists: [...state.playlists, ...playlists],
      total,
      previous,
    })
  ),
  on(PlaylistsActions.resetPlaylists, (state) => ({
    ...initialPlaylistsState,
  }))
);
