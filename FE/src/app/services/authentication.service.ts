import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserState } from '../models/userState';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _userIsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _userState: BehaviorSubject<UserState> = new BehaviorSubject(<UserState>({}));
  user: User;
  public readonly userState: Observable<UserState> = this._userState.asObservable();
  public userRole: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this._userState.next(new UserState(undefined, this._userIsLoading, this._userIsLoggedIn));

  }
  login(email: String, password: String) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(email + ':' + password)))
      }),
      responseType: 'text' as 'json'
    };

    return this._http.get<string>(environment.baseUrl + "/login", httpOptions)
      .pipe(
        map((token: string) => {
          localStorage.setItem('token', token);
          this.getCurrentUserFromBackend();
          return token;
        })
      );
  }



  loggedIn() {
    return !!localStorage.getItem('token');
  }

  isLoggedInAsync() {
    return this._userIsLoggedIn.asObservable();
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._userIsLoggedIn.next(false);
    this._userIsLoading.next(false);
    this._userState.next(new UserState(undefined, this._userIsLoading, this._userIsLoggedIn));
    this._router.navigate(['/login']);
  }

  isLoading() {
    if (!this._userState || !this._userState.getValue().isLoading) {
      return false;
    }
    return this._userState.getValue().isLoading.getValue();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFirstName() {
    return localStorage.getItem('currentUser');
    // return this.currentUser;
  }

  getCurrentUserState(): Observable<UserState> {
    // do not return the actual http request but rather the internal state of the user list
    this.getCurrentUserFromBackend();
    return this._userState;
  }

  getCurrentUserValue(): UserState {
    return this._userState.getValue();
  }

  private getCurrentUserFromBackend() {
    this._userIsLoading.next(true);
    // let _this = this;
    this._http.get<any>('api/user/current')
      .pipe(map((res: User) => {
        if (res) {
          this._userState.next(new UserState(new User(res), this._userIsLoading, this._userIsLoggedIn));
          this._userIsLoggedIn.next(true);
        } else {
          this._userState.next(new UserState(undefined, this._userIsLoading, this._userIsLoggedIn));
          this._userIsLoggedIn.next(false);
          this._userIsLoading.next(false);
        }
      })).subscribe(
        data => { },
        error => {
          this._userState.next(new UserState(undefined, this._userIsLoading, this._userIsLoggedIn));
          this._userIsLoggedIn.next(false);
          this._userIsLoading.next(false);
        },
        () => {
          this._userIsLoading.next(false);
        }
      );
  }
}
