import { RefreshAuthTokenService } from './../services/refresh-auth-token.service';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private refreshAuthTokenService: RefreshAuthTokenService,
    private authenticationService: AuthenticationService,
    private navController: NavController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authenticationService.isAuthenticated) {
      this.navController.navigateRoot('start');
      return false;
    }
    return true;

  }

}
