import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {
  AvailableGenreModel,
  CategoriesApiModel,
  FeaturedPlaylistsApiModel,
} from 'src/app/model/browse.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  getAvailableGenre = (token: string): Observable<AvailableGenreModel> => {
    return this.http.get<AvailableGenreModel>(
      `${environment.backendUrl}browse/available-genre`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  getCategories = (
    token: string,
    offset: number
  ): Observable<CategoriesApiModel> => {
    return this.http.get<CategoriesApiModel>(
      `${environment.backendUrl}browse/categories?offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  getCategoryPlaylist = (
    token: string,
    categoryId: string,
    offset: number
  ): Observable<FeaturedPlaylistsApiModel> => {
    return this.http.get<FeaturedPlaylistsApiModel>(
      `${environment.backendUrl}browse/category/playlists`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          categoryId,
          offset,
        },
      }
    );
  };

  getFeaturePlaylists = (
    token: string,
    offset: number
  ): Observable<FeaturedPlaylistsApiModel> => {
    return this.http.get<FeaturedPlaylistsApiModel>(
      `${environment.backendUrl}browse/featured-playlists`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
}
