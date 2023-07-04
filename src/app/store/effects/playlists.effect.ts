import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { BrowseService } from 'src/app/home/services/browse.service';

import { EPlaylists } from '../actions/playlists.action';
import { FeaturedPlaylistsApiModel } from '../../model/browse.model';
import * as PlaylistsActions from '../actions/playlists.action';

@Injectable()
export class PlaylistsEffect {
  constructor(
    private actions: Actions,
    private browserService: BrowseService
  ) {}

  getPlaylistsEffect = createEffect(() =>
    this.actions.pipe(
      ofType(EPlaylists.GET_PLAYLISTS),
      switchMap(({ categoryId, previous }) =>
        this.browserService.getCategoryPlaylist(categoryId, previous)
      ),
      switchMap((playlistsResponse: FeaturedPlaylistsApiModel) =>
        of(
          PlaylistsActions.getPlaylistsSuccess({
            playlists: playlistsResponse.playlists.items,
            total: playlistsResponse.playlists.total,
            previous:
              playlistsResponse.playlists.offset +
              playlistsResponse.playlists.limit,
          })
        )
      ),
    )
  );
}
