import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { FeaturedPlaylistsApiModel } from 'src/app/model/browse.model';
import { Playlists } from './../../../model/browse.model';
import { BrowseService } from '../../services/browse.service';

@Component({
  selector: 'app-featured-playlists',
  templateUrl: './featured-playlists.component.html',
  styleUrls: ['./featured-playlists.component.scss'],
})
export class FeaturedPlaylistsComponent {
  featuredPlaylist: Playlists[] = [];
  total = 0;

  constructor(private browseService: BrowseService, private router: Router) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.getFeaturedPlaylist(token, 0);
    }
  }

  getFeaturedPlaylist = (token: string, offset: number) => {
    this.browseService
      .getFeaturePlaylists(token, offset)
      .subscribe((data: FeaturedPlaylistsApiModel) => {
        console.log('>>>>>', data);
        this.total = data.playlists.total;
        this.featuredPlaylist = [
          ...this.featuredPlaylist,
          ...data.playlists.items,
        ];
        if (this.total !== 0 && offset + data.playlists.limit < this.total) {
          this.getFeaturedPlaylist(token, offset + data.playlists.limit);
        }
      });
  };

  onPlaylistSelect = (playlistId: string, playlistName: string) => {
    this.router.navigate(['/playlists'], {
      queryParams: { playlistId, playlistName },
    });
  };
}
