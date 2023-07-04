import { createReducer, on } from '@ngrx/store';

import { initialCategoriesState } from '../states/categories.state';
import * as CategoriesAction from '../actions/categories.action';

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(
    CategoriesAction.getCategoriesSuccess,
    (state, { categories, total, previous }) => ({
      ...state,
      categories: [...state.categories, ...categories],
      total,
      previous,
    })
  ),
  on(CategoriesAction.resetCategories, (state) => ({
    ...initialCategoriesState,
  }))
);
