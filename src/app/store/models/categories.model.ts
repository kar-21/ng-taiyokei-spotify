import { Categories } from "src/app/model/browse.model";

export interface CategoriesRequestModel {
  previous: number;
}

export interface CategoriesResponseModel {
  categories: Categories[];
  total: number;
  previous: number;
}
