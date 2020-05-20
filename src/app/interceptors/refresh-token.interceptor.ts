import { NGXLogger } from 'ngx-logger';
import { environment } from '@environments/environment';
import { RefreshAuthTokenService } from './../services/refresh-auth-token.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { NavController } from '@ionic/angular';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private navController: NavController,
    private logger: NGXLogger,
    private refreshAuthTokenService: RefreshAuthTokenService,
    private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.logger.info('RefreshTokenInterceptor => Entry', request.url);

    const doRefresh = (request.url.indexOf(environment.refreshUrl) === -1)
      && this.authenticationService.isAuthenticated
      && this.authenticationService.hasTokenExpired;
    if (doRefresh) {
      
      this.refreshAuthTokenService.invoke().subscribe(
        result => {
          this.logger.log('RefreshAuthTokenService => Got New Token', result);
          return next.handle(request);
        },
        error => {
          this.logger.error('RefreshTokenInterceptor => error:', error);
        });
    } else {
      return next.handle(request);
    }

  }
}

