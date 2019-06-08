import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorProvider } from './error-provider';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserDetail } from '../shared/interfaces/IUserDetail';
import { IToken } from '../shared/interfaces/IToken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ErrorProvider {

  private api = environment.api + 'account/';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(credentials: IUserLogin) {
    return this.http.post(this.api + 'login', credentials)
      .pipe(
        map((res: any) => {
          if (res) {
            this.deleteToken();
            localStorage.setItem('token', res.token);
            return true;
          }
          return false;
        }),
        catchError(this.handleError)
      );
  }

  register(resource: IUserRegister) {
    return this.http.post(this.api + 'register', resource)
      .pipe(
        map((res) => res as IUserDetail),
        catchError(this.handleError)
      );
  }

  userNameAvailable(userName: string): Observable<boolean> {
    return this.http.get(this.api + 'UserNameAvailable/' + userName)
      .pipe(
        map(res => res as boolean),
        catchError(this.handleError),
      );
  }

  private get token(): string {
    return localStorage.getItem('token');
  }

  get decodedToken(): IToken {
    const decodedToken = this.helper.decodeToken(this.token);

    const userDetail: IToken = {
      nameid: null,
      unique_name: null,
      email: null,
      roles: []
    };

    for (const key in decodedToken) {
      if (userDetail.hasOwnProperty(key)) {
        userDetail[key] = decodedToken[key];
      }
    }

    return userDetail;
  }

  get expirationDate(): Date | null {
    if (this.token) {
      return this.helper.getTokenExpirationDate(this.token);
    }
    return null;
  }

  get isExpired(): boolean {
    if (this.token) {
      return this.helper.isTokenExpired(this.token);
    }
    return true;
  }

  private deleteToken(): void {
    if (this.token) {
      localStorage.removeItem('token');
    }
  }

  get isAdmin(): boolean {
    return this.decodedToken.roles.indexOf('Admin') !== -1;
  }

  get isModerator(): boolean {
    return this.decodedToken.roles.indexOf('Moderator') !== -1;
  }

  get isUser(): boolean {
    return this.decodedToken.roles.indexOf('User') !== -1;
  }

  logout(): void {
    this.deleteToken();
    this.router.navigate(['/login']);
  }
}
