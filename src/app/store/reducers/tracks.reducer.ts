import { createReducer, on } from '@ngrx/store';
import { initialTracksState } from '../states/tracks.state';
import * as TracksActions from '../actions/tracks.action';

export const tracksReducer = createReducer(
  initialTracksState,
  on(TracksActions.getTracksSuccess, (state, { tracks, total, previous }) => ({
    ...state,
    tracks: [...state.tracks, ...tracks],
    total,
    previous,
  })),
  on(TracksActions.resetTracks, (state) => ({ ...initialTracksState }))
);
