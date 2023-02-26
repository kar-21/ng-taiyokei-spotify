import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(): Observable<LoginModel> {
    return this.http.get<LoginModel>(`${environment.backendUrl}login`);
  }
}
