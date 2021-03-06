import { AuthService } from './auth.service';
import { IUserDetail } from './../shared/interfaces/IUserDetail';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ErrorProvider } from './error-provider';
import { IUserList } from '../shared/interfaces/IUserList';
import { IUserUpdate } from '../shared/interfaces/IUserUpdate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ErrorProvider {

  private api = environment.api + 'users';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getUsers(): Observable<IUserList[]> {
    return this.http.get(this.api, this.authService.httpOptions)
      .pipe(
        map(data => data as IUserList[]),
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<IUserDetail> {
    return this.http.get(`${this.api}/${id}`, this.authService.httpOptions)
      .pipe(
        map(data => data as IUserDetail),
        catchError(this.handleError)
      );
  }

  updateUser(id: string, user: IUserUpdate): Observable<IUserDetail> {
    return this.http.put(`${this.api}/${id}`, user, this.authService.httpOptions)
      .pipe(
        map(data => data as IUserDetail),
        catchError(this.handleError)
      );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.api}/${id}`, this.authService.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
