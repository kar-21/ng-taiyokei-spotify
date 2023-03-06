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
    token: string,
    playlistId: string,
    offset: number
  ): Observable<PlaylistApi> => {
    return this.http.get<PlaylistApi>(`${environment.backendUrl}playlist`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { playlistId, offset },
    });
  };
}
