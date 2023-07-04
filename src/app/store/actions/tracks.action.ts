import { createAction, props } from '@ngrx/store';

import {
  TracksRequestModel,
  TracksResponseModel,
} from '../models/tracks.model';

export enum ETracks {
  GET_TRACKS = 'Get [tracks] data [times]',
  GET_TRACKS_SUCCESS = 'Get [tracks] data [times] success',
  RESET_TRACKS = 'Reset [tracks]',
}

export const getTracks = createAction(
  ETracks.GET_TRACKS,
  props<TracksRequestModel>()
);

export const getTracksSuccess = createAction(
  ETracks.GET_TRACKS_SUCCESS,
  props<TracksResponseModel>()
);

export const resetTracks = createAction(ETracks.RESET_TRACKS);
