import { ArtistModel, Track } from './../../../model/playlist.model';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { Playlists } from './../../../model/browse.model';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistApi, PlaylistItems } from 'src/app/model/playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  playlist: PlaylistItems[] = [];
  playlistName: string = '';
  total = 0;
  trackUri: string = '';

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) {
    const token = sessionStorage.getItem('token');
    const playlistId = this.route.snapshot.queryParamMap.get('playlistId');
    this.playlistName =
      this.route.snapshot.queryParamMap.get('playlistName') || '';
    console.log('>>>>>>> playlistId playlistName', {
      playlistId,
      playlistName: this.playlistName,
    });
    if (token && playlistId) {
      this.getPlaylist(token, playlistId, 0);
    }
  }

  getPlaylist = (token: string, playlistId: string, offset: number) => {
    this.playlistService
      .getPlaylists(token, playlistId, offset)
      .subscribe((data: PlaylistApi) => {
        console.log('>>>>>>> playlist', data);
        this.total = data.total;
        this.playlist = [...this.playlist, ...data.items];
        if (this.total !== 0 && offset + data.limit < this.total) {
          this.getPlaylist(token, playlistId, offset + data.limit);
        }
      });
  };

  getArtistsName = (artists: ArtistModel[]) => {
    let artistNames = '';
    artists.forEach((artist) => {
      if (artistNames) artistNames = `${artistNames}, ${artist.name}`;
      else artistNames = artist.name;
    });
    return artistNames;
  };

  onTrackClicked = (trackUri: string) => {
    console.log('>>>>>>> trackId', trackUri);
    this.trackUri = trackUri;
  };
}
