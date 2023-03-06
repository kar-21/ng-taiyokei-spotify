import { Router } from '@angular/router';
import { Categories } from './../../../model/browse.model';
import { Component } from '@angular/core';
import { CategoriesApiModel } from 'src/app/model/browse.model';

import { BrowseService } from '../../services/browse.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Categories[] = [];
  total = 0;

  constructor(private browseService: BrowseService, private router: Router) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.getCategories(token, 0);
    }
  }

  getCategories = (token: string, offset: number) => {
    this.browseService
      .getCategories(token, offset)
      .subscribe((data: CategoriesApiModel) => {
        console.log('>>>>>', data);
        this.total = data.categories.total;
        this.categories = [...this.categories, ...data.categories.items];
        if (this.total !== 0 && offset + data.categories.limit < this.total) {
          this.getCategories(token, offset + data.categories.limit);
        }
      });
  };

  onCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('>>>>> getCategoryPlaylist', categoryId);
    this.router.navigate(['/category-playlists'], {
      queryParams: { categoryId, categoryName },
    });
  };
}
