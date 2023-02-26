import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AvailableGenreModel } from 'src/app/model/browse.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  getAvailableGenre = (token: string): Observable<AvailableGenreModel> => {
    return this.http.get<AvailableGenreModel>(`${environment.backendUrl}browse/available-genre`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}
