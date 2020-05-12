import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  private _url :string = this.baseUrl+"?table=User";
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(this._url)
    .catch(this.errorHandler)
  }
  errorHandler(error :HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  addUser(user: any) {
    return this.http.post<any>('api/user/register', {operation:"insert", table:"User", values:user});
  }

  editUser(userUuid, userData) {
    return this.http.put<any>('api/user/' + userUuid, userData);
  }

  resetPassword(userUuid, userPassword) {
    return this.http.put<any>('api/user/' + userUuid + '/change-password', userPassword);
  }

  deleteUser(userUuid) {
    return this.http.delete<any>('api/user/' + userUuid);
  }

  sendRecoverMail(emailAddress: string): Observable<any> {
    return this. http.post('api/public/requestPasswordReset', emailAddress);
  }

  setPasswordWithToken(userPassword, token) {
    return this.http.post('api/public/resetPasswort/' + token , userPassword);
  }

  changePassword(userData) {
    return this.http.post('api/user/change-password', userData);
  }

  getUsers(): Observable<any> {
    return this.http.get<User[]>('api/user/all')
      .pipe(
        map((res) => {
          res = res['content'];
          return res;
        }
        ));
  }


}
