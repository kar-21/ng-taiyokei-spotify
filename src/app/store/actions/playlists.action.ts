import { createAction, props } from '@ngrx/store';

import {
  PlaylistRequestModal,
  PlaylistResponseModal,
} from '../models/playlists.model';

export enum EPlaylists {
  GET_PLAYLISTS = 'Get [Playlist] data [times]',
  GET_PLAYLISTS_SUCCESS = 'Get [Playlist] data [times] success',
  RESET_PLAYLISTS = 'Reset [Playlist]',
}

export const getPlaylists = createAction(
  EPlaylists.GET_PLAYLISTS,
  props<PlaylistRequestModal>()
);

export const getPlaylistsSuccess = createAction(
  EPlaylists.GET_PLAYLISTS_SUCCESS,
  props<PlaylistResponseModal>()
);

export const resetPlaylists = createAction(EPlaylists.RESET_PLAYLISTS);
