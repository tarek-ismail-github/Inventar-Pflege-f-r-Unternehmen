import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UserStateSettings } from './userStateSettings';
export class UserState implements UserStateSettings{
  private _user: User;
  private _isLoading: BehaviorSubject<boolean>;
  private _isLoggedIn: BehaviorSubject<boolean>;

  constructor(user: User, isLoading: BehaviorSubject<boolean>, isLoggedIn: BehaviorSubject<boolean>) {
    this._user = user;
    this._isLoading = isLoading;
    this._isLoggedIn = isLoggedIn;
  }

  public get user(): User {
    return this._user;
  }

  public get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }

  public set user(value: User) {
    this._user = value;
  }

  public set isLoading(value: BehaviorSubject<boolean>) {
    this._isLoading = value;
  }

  public get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: BehaviorSubject<boolean>) {
    this._isLoggedIn = value;
  }

  toJSON() {
    return {
      user: this._user,
      isLoading: this._isLoading,
      isLoggedIn: this._isLoggedIn
    };
  }
}
