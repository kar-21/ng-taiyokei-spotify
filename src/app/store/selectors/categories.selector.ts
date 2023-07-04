import { createSelector } from '@ngrx/store';

import { IAppState } from 'src/app/store/states/app.state';
import { ICategoriesState } from '../states/categories.state';

const getCategories = (state: IAppState) => state.categories;

export const selectCategories = createSelector(
  getCategories,
  (state: ICategoriesState) => state
);
