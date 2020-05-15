import { NGXLogger } from 'ngx-logger';
import { map, catchError } from 'rxjs/operators';
import { AuthUserInfo } from './../../shared/auth-user-info';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { AuthenticationService } from '@app/services/auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private endpoint = `${environment.authUrl}accounts:update?key=${environment.firebaseApiKey}`;

  oldPassword: string;
  newPassword: string;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) { }

  invoke(): Observable<any> {
    const request = {
      password: this.newPassword,
      idToken: this.authenticationService.idToken,
      returnSecureToken: true
    };
    return this.http.post<AuthUserInfo>(this.endpoint, request)
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
          this.logger.error('ChangePasswordService', error);
          return null;
        })

      );

  }
}
