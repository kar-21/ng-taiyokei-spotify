import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BreadcrumbService } from 'xng-breadcrumb';

import { PlaylistItems } from 'src/app/model/playlist.model';
import { IAppState } from 'src/app/store/states/app.state';
import { getTracks, resetTracks } from 'src/app/store/actions/tracks.action';
import { selectTracks } from 'src/app/store/selectors/tracks.selector';
import { ITracksState } from 'src/app/store/states/tracks.state';

import { ArtistModel } from './../../../model/playlist.model';
import { setSelectedTrackUri } from 'src/app/store/actions/selectedItem.action';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  playlist: PlaylistItems[] = [];
  playlistName: string = '';
  total = 0;
  previous = 0;
  isMobileScreen = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private breadcrumbService: BreadcrumbService,
    public breakpointObserver: BreakpointObserver
  ) {
    const playlistId =
      this.route.snapshot.queryParamMap.get('playlistId') || '';
    this.playlistName =
      this.route.snapshot.queryParamMap.get('playlistName') || '';

    this.breadcrumbService.set('@playlists', this.playlistName);

    if (this.previous === 0) {
      this.store.dispatch(resetTracks());
      this.store.dispatch(getTracks({ playlistId, previous: 0 }));
    }
    this.store.pipe(select(selectTracks)).subscribe((tracks: ITracksState) => {
      if (this.previous !== 0 && tracks.previous < tracks.total) {
        this.store.dispatch(
          getTracks({ playlistId, previous: tracks.previous })
        );
      }
      this.playlist = tracks.tracks;
      this.total = tracks.total;
      this.previous = tracks.previous;
    });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobileScreen = state.matches;
      });
  }

  getArtistsName = (artists: ArtistModel[]) => {
    let artistNames = '';
    artists.forEach((artist) => {
      if (artistNames) artistNames = `${artistNames}, ${artist.name}`;
      else artistNames = artist.name;
    });
    return artistNames;
  };

  onTrackClicked = (trackUri: string) => {
    this.store.dispatch(setSelectedTrackUri({ trackUri }));
  };
}
