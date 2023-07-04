import { of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ETracks } from '../actions/tracks.action';
import { PlaylistService } from 'src/app/home/services/playlist.service';
import * as TracksActions from '../actions/tracks.action';
import { PlaylistApi } from 'src/app/model/playlist.model';

@Injectable()
export class TracksEffect {
  constructor(
    private actions: Actions,
    private playlistService: PlaylistService
  ) {}

  getTracksEffect = createEffect(() =>
    this.actions.pipe(
      ofType(ETracks.GET_TRACKS),
      switchMap(({ playlistId, previous }) =>
        this.playlistService.getPlaylists(playlistId, previous)
      ),
      switchMap((tracksResponse: PlaylistApi) =>
        of(
          TracksActions.getTracksSuccess({
            tracks: tracksResponse.items,
            total: tracksResponse.total,
            previous: tracksResponse.offset + tracksResponse.limit,
          })
        )
      )
    )
  );
}
