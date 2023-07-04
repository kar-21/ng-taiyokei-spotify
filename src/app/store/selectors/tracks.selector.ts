import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { ITracksState } from '../states/tracks.state';

const getTracks = (state: IAppState) => state.tracks;

export const selectTracks = createSelector(
  getTracks,
  (state: ITracksState) => state
);
