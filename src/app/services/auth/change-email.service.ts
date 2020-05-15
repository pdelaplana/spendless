import { ErrorHandlerService } from '@app/services/error-handler.service';
import { map, catchError } from 'rxjs/operators';
import { AuthUserInfo } from '../../shared/auth-user-info';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmailService {
  private endpoint = `${environment.authUrl}accounts:update?key=${environment.firebaseApiKey}`;

  email: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  invoke(): Observable<any> {
    const request = {
      email: this.email,
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
          this.errorHandlerService.handleError('ChangeEmailService', error);
          return null;
        })

      );

  }
}
