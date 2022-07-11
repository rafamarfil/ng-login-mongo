import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();
class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private uri = 'http://localhost:5000/api/users';
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta') as string) ||
      new DecodedToken();
  }

  public login(loginData: any): Observable<any> {
    const URI = this.uri + '/login';

    return this.http.post(URI, loginData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  public register(userData: any): Observable<any> {
    const URI = this.uri + '/register';
    return this.http.post(URI, userData);
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
}
