import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  LoginModel,
  RefreshModal,
  TokenModal,
} from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(): Observable<LoginModel> {
    return this.http.get<LoginModel>(`${environment.backendUrl}login`);
  }

  refreshToken(refreshToken: string): Observable<TokenModal> {
    return this.http.get<TokenModal>(
      `${environment.backendUrl}login/refreshToken`,
      {
        params: {
          refresh_token: refreshToken,
        },
      }
    );
  }
}
