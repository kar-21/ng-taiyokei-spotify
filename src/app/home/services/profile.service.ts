import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileModel } from 'src/app/model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile = (token: string): Observable<ProfileModel> => {
    return this.http.get<ProfileModel>(
      `${environment.backendUrl}userProfile/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
}
