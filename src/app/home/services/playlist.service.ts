import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlaylistApi } from 'src/app/model/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylists = (
    playlistId: string,
    offset: number
  ): Observable<PlaylistApi> => {
    return this.http.get<PlaylistApi>(`${environment.backendUrl}playlist`, {
      params: { playlistId, offset },
    });
  };
}
