import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserState } from '../models/userState';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { }

  canActivate() : Promise<boolean>{
    const promise = new Promise<boolean>((resolve, reject) => {
      this._authService.userState.subscribe((userState: UserState) => {
       // console.log(userState.user.role);
       if (userState.user) {
         if (userState.user.hasRole('ROLE_ADMINISTRATOR', 'any') || userState.user.hasRole('ROLE_MANAGER', 'any')) {

           resolve(true);
         }
       }
       // resolve(false);
       if (!userState.isLoading.getValue() && !userState.isLoggedIn.getValue()) {
         localStorage.removeItem('token');
         resolve(false);
       }
     }, (error) => {
       resolve(false);
     });
   });
   return promise;
  }
}
