import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _loginService: AuthenticationService, private _router: Router) { }

  canActivate(): boolean {
    if (this._loginService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url }});
      return false;
    }
  }
  
}
