import { DataCacheService } from './data-cache.service';
import { GetAccountService } from './account/get-account.service';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './auth/authentication.service';
import { AuthUserInfo } from './../shared/auth-user-info';
import { Account } from './../models/account';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endpoint = `${environment.authUrl}accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

  email: string;
  password: string;

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    // handle your auth error or rethrow
    if (err.status === 401) {
      // navigate /delete cookies or whatever
      console.log('handled error ' + err.status);

      return of(err.message);
    }
    throw err;
  }

  constructor(
    private http: HttpClient,
    private getAccountService: GetAccountService,
    private dataCacheService: DataCacheService,
    private authenticationService: AuthenticationService) { }

  invoke(): Observable<any> {
    const request = {
      email: this.email,
      password: this.password,
      returnSecureToken: true
    };
    return this.http.post<AuthUserInfo>( this.endpoint, request )
      .pipe(
        map(result => {
          this.authenticationService.authUserInfo = {
            idToken : result.idToken,
            refreshToken : result.refreshToken,
            localId : result.localId,
            email : result.email,
            expiresIn : result.expiresIn,
            expiresOn : moment().add(result.expiresIn, 's').toDate()
          };
          return result;
        }),
        catchError((error, caught) => {
          this.handleAuthError(error);
          return null;
        })
      );
  }
}
