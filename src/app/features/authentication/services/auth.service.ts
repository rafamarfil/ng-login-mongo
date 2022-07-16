import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { URI_LOCALHOST, USER_LOGIN, USER_REGISTER } from './http-consts';

const jwt = new JwtHelperService();
class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta') as string) ||
      new DecodedToken();
  }

  public login(loginData: any): Observable<any> {
    const URL = URI_LOCALHOST + USER_LOGIN;

    return this.http.post(URL, loginData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  public register(userData: any): Observable<any> {
    const URL = URI_LOCALHOST + USER_REGISTER;
    return this.http.post(URL, userData);
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken = new DecodedToken();
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
}
