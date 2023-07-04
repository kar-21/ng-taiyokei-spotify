import { createAction, props } from '@ngrx/store';

import { Categories } from './../../model/browse.model';
import { CategoriesRequestModel, CategoriesResponseModel } from '../models/categories.model';

export enum ECategories {
  GET_CATEGORIES = 'Get [Categories] data [times]',
  GET_CATEGORIES_SUCCESS = 'Get [Categories] data [times] success',
  RESET_CATEGORIES = 'Reset [Categories]',
}

export const getCategories = createAction(
  ECategories.GET_CATEGORIES,
  props<CategoriesRequestModel>()
);

export const getCategoriesSuccess = createAction(
  ECategories.GET_CATEGORIES_SUCCESS,
  props<CategoriesResponseModel>()
);

export const resetCategories = createAction(ECategories.RESET_CATEGORIES);
