import { createReducer, on } from '@ngrx/store';
import { initialSelectedItemState } from '../states/selectedItem.state';
import * as SelectedItemActions from '../actions/selectedItem.action';

export const selectedItemReducer = createReducer(
    initialSelectedItemState,
  on(SelectedItemActions.setSelectedTrackUri, (state, { trackUri }) => ({
    ...state,
    trackUri,
  }))
);
