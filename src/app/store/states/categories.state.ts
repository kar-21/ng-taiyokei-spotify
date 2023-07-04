import { Categories } from './../../model/browse.model';

export interface ICategoriesState {
  categories: Categories[];
  total: number;
  previous: number;
}

export const initialCategoriesState = {
  categories: [] as Categories[],
  total: 0,
  previous: 0,
};
