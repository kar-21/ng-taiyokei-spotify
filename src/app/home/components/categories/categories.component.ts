import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { IAppState } from 'src/app/store/states/app.state';
import { ICategoriesState } from 'src/app/store/states/categories.state';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
import {
  getCategories,
  resetCategories,
} from 'src/app/store/actions/categories.action';
import { Categories } from 'src/app/model/browse.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories = [] as Categories[];
  total = 0;
  previous = 0;

  constructor(private router: Router, private store: Store<IAppState>) {
    if (this.previous === 0) {
      this.store.dispatch(resetCategories());
      this.store.dispatch(getCategories({ previous: 0 }));
    }

    this.store
      .pipe(select(selectCategories))
      .subscribe((categoriesState: ICategoriesState) => {
        this.categories = categoriesState.categories;
        this.total = categoriesState.total;
        this.previous = categoriesState.previous;
        if (
          categoriesState.previous !== 0 &&
          categoriesState.previous < categoriesState.total
        ) {
          this.store.dispatch(
            getCategories({ previous: categoriesState.previous })
          );
        }
      });
  }

  onCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('>>>>> getCategoryPlaylist', categoryId);
    this.router.navigate(['/category-playlists'], {
      queryParams: { categoryId, categoryName },
    });
  };
}
