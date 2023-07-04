import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { ISelectedItem } from '../states/selectedItem.state';

const getSelectedItem = (state: IAppState) => state.selectedItem;

export const selectedTrackUri = createSelector(
  getSelectedItem,
  (state: ISelectedItem) => state.trackUri
);
