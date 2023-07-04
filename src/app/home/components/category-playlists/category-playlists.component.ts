import { BreadcrumbService } from 'xng-breadcrumb';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Playlists } from 'src/app/model/browse.model';
import {
  getPlaylists,
  resetPlaylists,
} from 'src/app/store/actions/playlists.action';
import { selectPlaylists } from 'src/app/store/selectors/playlists.selector';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.scss'],
})
export class CategoryPlaylistsComponent {
  categoryPlaylist: Playlists[] = [];
  category: string = '';
  total = 0;
  previous = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>,
    private breadcrumbService: BreadcrumbService
  ) {
    const categoryId =
      this.route.snapshot.queryParamMap.get('categoryId') || '';
    this.category = this.route.snapshot.queryParamMap.get('categoryName') || '';

    this.breadcrumbService.set('@category-playlists', this.category)

    if (this.previous === 0) {
      this.store.dispatch(resetPlaylists());
      this.store.dispatch(
        getPlaylists({
          categoryId: categoryId,
          previous: 0,
        })
      );
    }

    this.store.pipe(select(selectPlaylists)).subscribe((categoryPlaylists) => {
      this.categoryPlaylist = categoryPlaylists.playlists;
      this.total = categoryPlaylists.total;

      if (
        categoryPlaylists.previous !== 0 &&
        categoryPlaylists.previous < categoryPlaylists.total
      ) {
        this.store.dispatch(
          getPlaylists({
            categoryId: categoryId,
            previous: categoryPlaylists.previous,
          })
        );
      }
    });
  }

  onPlaylistSelect = (playlistId: string, playlistName: string) => {
    this.router.navigate(['/playlists'], {
      queryParams: { playlistId, playlistName },
    });
  };
}
