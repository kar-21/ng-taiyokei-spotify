import { createAction, props } from '@ngrx/store';
import { SelectedTrackUriModel } from '../models/selectedItem.model';

export enum ESelectedItem {
  SELECTED_TRACK = 'selected [track uri]',
}

export const setSelectedTrackUri = createAction(
  ESelectedItem.SELECTED_TRACK,
  props<SelectedTrackUriModel>()
);
