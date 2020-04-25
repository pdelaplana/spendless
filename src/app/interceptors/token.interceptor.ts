import { RefreshAuthTokenService } from '@app/services/refresh-auth-token.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '@app/services/authentication.service';
import * as moment from 'moment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private logger: NGXLogger,
    private navController: NavController,
    private authenticationService: AuthenticationService,
    private refreshAuthTokenService: RefreshAuthTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.logger.info('TokenInterceptor => request.url ', request.url);

    if (request.url.indexOf(environment.refreshUrl) !== -1) {
        return next.handle(request);
    }

    const accessExpired = !this.authenticationService.isAuthenticated;
    const refreshExpired = this.authenticationService.hasTokenExpired;

    if (!this.authenticationService.hasTokenExpired) {
        return next.handle(request);
    }
    if (this.authenticationService.isAuthenticated && this.authenticationService.hasTokenExpired) {
        if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.refreshAuthTokenService.invoke().pipe(
                switchMap((result) => {
                  this.authenticationService.authUserInfo = {
                    idToken : result.id_token,
                    refreshToken : result.refresh_token,
                    localId : result.user_id,
                    email : '',
                    expiresIn : result.expires_in,
                    expiresOn : moment().add(result.expire_in, 's').toDate()
                  };
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(result.refresh_token);
                  return next.handle(this.injectToken(request));
                }),
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.injectToken(request));
                })
            );
        }
    }
    return next.handle(this.injectToken(request));
  }

  private injectToken(request: HttpRequest<any>) {
      const token = this.authenticationService.idToken;
      request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
      return this.injectHeaders(request);
  }

  private injectHeaders(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return request;
  }



}
