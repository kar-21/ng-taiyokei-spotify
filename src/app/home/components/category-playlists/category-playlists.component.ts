import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Playlists,
  FeaturedPlaylistsApiModel,
} from 'src/app/model/browse.model';
import { BrowseService } from '../../services/browse.service';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.scss'],
})
export class CategoryPlaylistsComponent {
  categoryPlaylist: Playlists[] = [];
  category: string = '';
  total = 0;

  constructor(
    private browseService: BrowseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const categoryId = this.route.snapshot.queryParamMap.get('categoryId');
    this.category = this.route.snapshot.queryParamMap.get('categoryName') || '';
    if (token && categoryId) {
      this.getCategoryPlaylist(token, categoryId, 0);
    }
  }

  getCategoryPlaylist = (token: string, categoryId: string, offset: number) => {
    this.browseService
      .getCategoryPlaylist(token, categoryId, offset)
      .subscribe((data: FeaturedPlaylistsApiModel) => {
        console.log('>>>>>', data);
        this.total = data.playlists.total;
        this.categoryPlaylist = [
          ...this.categoryPlaylist,
          ...data.playlists.items,
        ];
        if (this.total !== 0 && offset + data.playlists.limit < this.total) {
          this.getCategoryPlaylist(
            token,
            categoryId,
            offset + data.playlists.limit
          );
        }
      });
  };

  onPlaylistSelect = (playlistId: string, playlistName: string) => {
    this.router.navigate(['/playlists'], {
      queryParams: { playlistId, playlistName },
    });
  };
}
