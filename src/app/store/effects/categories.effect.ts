import { switchMap, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CategoriesActions from 'src/app/store/actions/categories.action';
import { BrowseService } from 'src/app/home/services/browse.service';
import { CategoriesApiModel } from 'src/app/model/browse.model';

import { IAppState } from '../states/app.state';

@Injectable()
export class CategoriesEffect {
  constructor(private actions: Actions, private browseService: BrowseService, private store: Store<IAppState>) {}

  getCategories = createEffect(() =>
    this.actions.pipe(
      ofType(CategoriesActions.ECategories.GET_CATEGORIES),
      switchMap(({ previous }) =>
        this.browseService.getCategories(previous)
      ),
      switchMap((categoriesResponse: CategoriesApiModel) =>
        of(
          CategoriesActions.getCategoriesSuccess({
            categories: categoriesResponse.categories.items,
            total: categoriesResponse.categories.total,
            previous:
              categoriesResponse.categories.offset +
              categoriesResponse.categories.limit,
          })
        )
      ),
    )
  );
}
